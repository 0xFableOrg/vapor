/**
 * TODO
 */

import {
  waitForRemotePeer,
  createDecoder,
  createEncoder,
  bytesToUtf8,
  utf8ToBytes,
  createRelayNode,
} from "@waku/sdk"

import protobuf from "protobufjs"

// Every Waku Message has a content topic that categorizes it.
// It is always encoded in clear text.
// Recommended topic format: `/dapp-name/version/functionality/codec`
// Codecs: `proto` for protobuf, `utf-8` for simple utf-8 strings.
const systemTopic = "/vapor/1/system/proto"
const chatTopic = "/vapor/1/chat/proto"

// NOTE: Do we need `ephemeral = true`? (default is `false`).
// Probably not because we're not running a storage node.
// If we want to support offline messaging, then we can use a storage nodes.
const systemEncoder = createEncoder({ systemTopic })
const systemDecoder = createDecoder(systemTopic)

// Create a message structure using Protobuf
const ChatMessage = new protobuf.Type("ChatMessage")
  .add(new protobuf.Field("timestamp", 1, "uint64"))
  .add(new protobuf.Field("sender", 2, "string"))
  .add(new protobuf.Field("message", 3, "string"))

const SystemMessage = new protobuf.Type("SystemMessage")
  .add(new protobuf.Field("timestamp", 1, "uint64"))
  .add(new protobuf.Field("sender", 2, "string"))
  .add(new protobuf.Field("type", 3, "uint32"))
  .add(new protobuf.Field("args", 4, "bytes"))
  .add(new protobuf.Field("signature", 5, "bytes"))

/**
 * TODO
 */
export async function startWaku(signalStatus, msgCallback) {
  const node = await createRelayNode({
    // Emits messages to self too.
    emitSelf: true,
    // TODO: do we need this?
    // defaultBootstrap: true,
  })

  // In case we want to run a light node instead.
  const node = await createLightNode()
  try {
    // TODO lookup docs of this
    await getPeers()
  } catch (e) {
    signalStatus("Failed to find a peer")
  }

  await node.start()

  // For debugging
  window.waku = node

  // Add a hook to process all incoming messages on a specified content topic.

  const subscriptionCallback = (message) => {
    // Checks there is a payload on the message.
    // Waku Message is encoded in protobuf, in proto v3 fields are always optional.
    if (!message.payload) return

    const messageObj = SystemMessage.decode(message.payload)

    // For debugging
    console.dir(messageObj)
    msgCallback(decodedMessage)
  }

  node.relay.subscribe(
    systemDecoder,
    subscriptionCallback,
    [systemTopic])

  // // For light node
  // const subscription = await node.filter.createSubscription()
  // await subscription.subscribe([systemDecoder], subscriptionCallback)

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

// // Example
// const msgType = ChatMessage
// const msgPayload = {
//   timestamp: Date.now(),
//   sender: "Alice",
//   message: "Hello, World!",
// }

export async function sendMessage(node, msgType, msgPayload) {
  const protoMessage = msgType.create(msgPayload)
  const serialisedMessage = msgType.encode(protoMessage).finish()
  await waku.relay.send(systemEncoder, { payload: serialisedMessage })
}

export async shutdownWaku(node) {
  // // For light node
  // await subscription.unsubscribe([systemTopic])
  // node.relay.unsubscribe([systemTopic])

  // Should work for both relay and light nodes (but verify for light node)
  for (const subscription of node.relay.toSubscriptionIterable()) {
    await subscription.unsubscribe([systemTopic])
  }
  await node.stop()
}

// === REFERENCE ===

// // Get list of peers (for use with light node)
// await node.libp2p.peerStore.all()

// // Callback on new peer connection (for use with light node)
// node.store.addLibp2pEventListener("peer:connect", async (event) => {
//   const peerId = event.detail
//   console.log(`Peer connected with peer id: ${peerId}`)
// })
