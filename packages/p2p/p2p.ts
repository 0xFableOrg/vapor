/**
 * TODO
 */

import {
  waitForRemotePeer,
  createDecoder,
  createEncoder,
  createRelayNode, RelayNode, Waku, Decoder, IRelay, Encoder, utf8ToBytes
} from "@waku/sdk"

import { ethers, Wallet } from "ethers"

import protobuf, { Reader } from "protobufjs"

export { utf8ToBytes } from "@waku/sdk"

// =================================================================================================

// Every Waku Message has a content topic that categorizes it.
// It is always encoded in clear text.
// Recommended topic format: `/dapp-name/version/functionality/codec`

// =================================================================================================

// const chatTopic = "/vapor/1/chat/proto"

// // Create a message structure using Protobuf
// const ChatMessage = new protobuf.Type("ChatMessage")
//   .add(new protobuf.Field("timestamp", 1, "uint64"))
//   .add(new protobuf.Field("sender", 2, "string"))
//   .add(new protobuf.Field("message", 3, "string"))

// =================================================================================================

/** Type of encoded payloads received from the Waku network. */
type EncodedPayload = Reader | Uint8Array

/** Waku node that has a relay component. */
export type WakuNode = RelayNode & { relay: IRelay }

// =================================================================================================

const systemTopic = "/vapor/1/system/proto"

// NOTE: Do we need `ephemeral = true`? (default is `false`).
// Probably not because we're not running a storage node.
// If we want to support offline messaging, then we can use a storage nodes.
const systemEncoder = createEncoder({ contentTopic: systemTopic })
const systemDecoder = createDecoder(systemTopic)

export enum SystemMessageType {
  JoinGame = 1,
  ChangePlayerSettings = 2,
  ChangeGameSettings = 3,
  LockGameSettings = 4,
  MarkPlayerReady = 5,
  LeaveRoom = 6
}

const SystemMessage = new protobuf.Type("SystemMessage")
  .add(new protobuf.OneOf("type", {
    joinGame: SystemMessageType.JoinGame,
    changePlayerSettings: SystemMessageType.ChangePlayerSettings,
    changeGameSettings: SystemMessageType.ChangeGameSettings,
    lockGameSettings: SystemMessageType.LockGameSettings,
    markPlayerReady: SystemMessageType.MarkPlayerReady,
    leaveRoom:  SystemMessageType.LeaveRoom
  }))
  .add(new protobuf.Field("signature", 1, "string"))
  .add(new protobuf.Field("payload", 2, "bytes"))

type SystemMessage = protobuf.Message<{
  type: number
  signature: string
  payload: Uint8Array
}>

const SettingsMessage = new protobuf.Type("ChangePlayerSettings")
  .add(new protobuf.Field("settingsNames", 1, "string", "repeated"))
  .add(new protobuf.Field("settingsValues", 2, "bytes", "repeated"))

export type Address = `0x${string}`

type SystemMessageInputs = {
  type: number
  settingsNames: string[]
  settingsValues: Uint8Array[]
  privateKey: Address
}

type DecodedSystemMessage = {
  type: number,
  address: string,
  payload: {
    settingsNames: string[]
    settingsValues: Uint8Array[]
  }
}

export async function subscribeToSystem(node: WakuNode, msgCallback: (msg: DecodedSystemMessage) => void) {
  return subscribeToTopic(node, systemDecoder, (payload: EncodedPayload) => {
    const systemMessage: any = SystemMessage.decode(payload)
    // TODO does this work?
    const settingsMessage: any = SettingsMessage.decode((systemMessage as any).payload)
    const address = ethers.verifyMessage(systemMessage.payload, systemMessage.signature)
    const decodedMessage: DecodedSystemMessage = {
      type: systemMessage.type,
      address,
      payload: {
        settingsNames: settingsMessage.settingsNames,
        settingsValues: settingsMessage.settingsValues
      }
    }
    msgCallback(decodedMessage)
  })
}

export async function sendSystemMessage(node: WakuNode, inputs: SystemMessageInputs) {
  const settingsMessage = SettingsMessage.create({
    settingsNames: inputs.settingsNames,
    settingsValues: inputs.settingsValues
  })

  const settingsPayload = SettingsMessage.encode(settingsMessage).finish()
  const wallet = new Wallet(inputs.privateKey)

  const payload: SystemMessage = SystemMessage.create({
    type: inputs.type,
    signature: await wallet.signMessage(settingsPayload),
    payload: settingsPayload
  })

  await sendMessage(node, systemEncoder, SystemMessage, payload)
}

// =================================================================================================

/**
 * Starts and return a waku node. Relay node for now.
 */
export async function startWakuNode() {
  const node = await createRelayNode({
    // Emits messages to self too.
    emitSelf: true,
    // Plot twist: default bootstrap is not actually the default...
    defaultBootstrap: true,
  })

  // // In case we want to run a light node instead.
  // const node = await createLightNode()
  // try {
  //   // TODO lookup docs of this
  //   await getPeers()
  // } catch (e) {
  //   signalStatus("Failed to find a peer")
  // }

  await node.start()

  // For debugging
  ;(window as any).waku = node

  return node
}

// =================================================================================================

/**
 * Subscribe the node to the given topic, calling `msgCallback` with the message payload if it
 * exists. Returns an unsubscribe function.
 */
export async function subscribeToTopic(node: Waku & { relay: IRelay }, decoder: Decoder, payloadCallback: (payload: EncodedPayload) => void) {
  return node.relay.subscribe(decoder, (message) => {
    // Checks there is a payload on the message.
    // Waku Message is encoded in protobuf, in proto v3 fields are always optional.
    if (!message.payload) return
    payloadCallback(message.payload)
  })
}

// =================================================================================================

/**
 * Example function for the waku setup that subscribes to the system topic.
 */
export async function setupWaku(signalStatus: (status: string) => void, msgCallback: (msg: DecodedSystemMessage) => void) {

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

export async function shutdownWaku(node: WakuNode) {
  // // For light node
  // await subscription.unsubscribe([systemTopic])

  // TODO need to unsubscribe

  await node.stop()
}

// =================================================================================================

// // Example
// const msgType = ChatMessage
// const msgPayload = {
//   timestamp: Date.now(),
//   sender: "Alice",
//   message: "Hello, World!",
// }

export async function sendMessage(node: WakuNode, encoder: Encoder, msgType: protobuf.Type, msgPayload: any) {
  const protoMessage = msgType.create(msgPayload)
  const serialisedMessage = msgType.encode(protoMessage).finish()
  await node.relay.send(encoder, { payload: serialisedMessage })
}

// =================================================================================================