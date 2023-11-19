import { createDecoder, createEncoder, waitForRemotePeer } from "@waku/sdk"
import protobuf from "protobufjs"
import { Address, EncodedPayload, WakuNode } from "./types"
import { ethers, Wallet } from "ethers"
import { sendMessage, startWakuNode, subscribeToTopic, utf8ToBytes } from "./p2p"

// =================================================================================================

// Every Waku Message has a content topic that categorizes it.
// It is always encoded in clear text.
// Recommended topic format: `/dapp-name/version/functionality/codec`
const systemTopic = "/vapor/1/system/proto"

const systemEncoder = createEncoder({ contentTopic: systemTopic })
const systemDecoder = createDecoder(systemTopic)

// =================================================================================================

/**
 * Types of messages.
 */
export enum SystemMessageType {
  JoinGame = 1,
  ChangePlayerSettings = 2,
  ChangeGameSettings = 3,
  LockGameSettings = 4,
  MarkPlayerReady = 5,
  LeaveRoom = 6,
  ChatMessage = 7,
  ConfirmJoin = 8
}

// =================================================================================================

/**
 * Protobuf message type for system messages.
 */
const SystemMessage = new protobuf.Type("SystemMessage")
  .add(new protobuf.OneOf("type", {
    joinGame: SystemMessageType.JoinGame,
    changePlayerSettings: SystemMessageType.ChangePlayerSettings,
    changeGameSettings: SystemMessageType.ChangeGameSettings,
    lockGameSettings: SystemMessageType.LockGameSettings,
    markPlayerReady: SystemMessageType.MarkPlayerReady,
    // all of the above, payload: protobuf-encoded SettingsMessage

    leaveRoom: SystemMessageType.LeaveRoom,
    // payload: abi-encoded "leave" message

    chatMessage: SystemMessageType.ChatMessage,
    // payload: protobuf-encoded ChatMessage

    confirmJoin: SystemMessageType.ConfirmJoin
  }))
  .add(new protobuf.Field("signature", 1, "string"))
  .add(new protobuf.Field("payload", 2, "bytes"))
  // TODO: only works for the first 2^64 sessions ;)
  // TODO: must sign over this do to avoid replays
  .add(new protobuf.Field("sessionID", 3, "int64"))

/**
 * Protobuf message type for messages that carry settings.
 */
const SettingsMessage = new protobuf.Type("ChangePlayerSettings")
  .add(new protobuf.Field("settingsNames", 1, "string", "repeated"))
  .add(new protobuf.Field("settingsValues", 2, "bytes", "repeated"))

/**
 * Protobuf message type for chat messages.
 */
const ChatMessage = new protobuf.Type("ChatMessage")
  .add(new protobuf.Field("message", 1, "string"))

const ConfirmJoin = new protobuf.Type("ConfirmJoin")
  .add(new protobuf.Field("address", 1, "string"))

// =================================================================================================

/**
 * Inputs to send a system message.
 *
 * `message` is filled for chat messages.
 * `joiner` is filled for confirmJoin messages.
 * `settingsNames` and `settingsValues` are filled for all other messages except leave.
 */
type SystemMessageInputs = {
  type: SystemMessageType
  sessionID: number
  settingsNames?: string[]
  settingsValues?: Uint8Array[]
  message?: string
  joiner?: Address
  privateKey: `0x${string}`
}

/**
 * Decoded system message.
 *
 * `message` is filled for chat messages.
 * `joiner` is filled for confirmJoin messages.
 * `settingsNames` and `settingsValues` are filled for all other messages except leave.
 */
export type DecodedSystemMessage = {
  type: number
  address: Address
  sessionID: number
  message?: string
  settingsNames?: string[]
  settingsValues?: Uint8Array[]
  joiner?: Address
}

// =================================================================================================

/**
 * Subscribe to the system topic. It will call the callback when a message is received.
 */
export async function subscribeToSystem(node: WakuNode, msgCallback: (msg: DecodedSystemMessage) => void) {
  return subscribeToTopic(node, systemDecoder, (payload: EncodedPayload) => {
    const systemMessage: any = SystemMessage.decode(payload)

    let settingsNames: string[] | undefined = undefined
    let settingsValues: Uint8Array[] | undefined = undefined
    let message: string | undefined = undefined
    let joiner: Address | undefined = undefined

    if (systemMessage.type === SystemMessageType.ChatMessage) {
      const chatMessage: any = ChatMessage.decode(systemMessage.payload)
      message = chatMessage.message
    } else if (systemMessage.type === SystemMessageType.LeaveRoom) {
      // Nothing to do
    } else if (systemMessage.type === SystemMessageType.ConfirmJoin) {
      const confirmJoinMessage: any = ConfirmJoin.decode(systemMessage.payload)
      joiner = confirmJoinMessage.address
    } else {
      const settingsMessage: any = SettingsMessage.decode(systemMessage.payload)
      settingsNames = settingsMessage.settingsNames
      settingsValues = settingsMessage.settingsValues
    }

    const address = ethers.utils.verifyMessage(systemMessage.payload, systemMessage.signature) as Address
    const decodedMessage: DecodedSystemMessage = {
      type: systemMessage.type,
      sessionID: systemMessage.sessionID,
      address,
      message,
      settingsNames,
      settingsValues,
      joiner
    }
    msgCallback(decodedMessage)
  })
}

// =================================================================================================

/**
 * Send a system message.
 */
export async function sendSystemMessage(node: WakuNode, inputs: SystemMessageInputs) {
  let payload: any
  if (inputs.type === SystemMessageType.ChatMessage) {
    const chatMessage = ChatMessage.create({ message: inputs.message })
    payload = ChatMessage.encode(chatMessage).finish()
  } else if (inputs.type === SystemMessageType.LeaveRoom) {
    payload = utf8ToBytes("leave")
  } else if (inputs.type === SystemMessageType.ConfirmJoin) {
    const confirmJoinMessage = ConfirmJoin.create({ address: inputs.joiner})
    payload = ConfirmJoin.encode(confirmJoinMessage).finish()
  } else {
    const settingsMessage = SettingsMessage.create({
      settingsNames: inputs.settingsNames,
      settingsValues: inputs.settingsValues
    })
    payload = SettingsMessage.encode(settingsMessage).finish()
  }

  const wallet = new Wallet(inputs.privateKey)
  const systemMessage = SystemMessage.create({
    type: inputs.type,
    signature: await wallet.signMessage(payload),
    payload: payload,
    sessionID: inputs.sessionID
  })

  await sendMessage(node, systemEncoder, SystemMessage, systemMessage)
}

// =================================================================================================

/**
 * Starts a Waku node and subscribe to system messages.
 */
export async function setupWakuForSystem(
  signalStatus: (status: string) => void,
  msgCallback: (msg: DecodedSystemMessage) => void
): Promise<WakuNode> {
  const node = await startWakuNode()
  await subscribeToSystem(node, msgCallback)
  signalStatus("Connecting to a peer")

  // Best effort method that waits for the Waku node to be connected to remote
  // waku nodes (peers) and for appropriate handshakes to be done.
  await waitForRemotePeer(node)

  // // For light node
  // await waitForRemotePeer(node, [
  //   Protocols.LightPush,
  //   Protocols.Filter,
  // ])

  return node
}

// =================================================================================================