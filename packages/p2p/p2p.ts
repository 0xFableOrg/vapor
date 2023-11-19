/**
 * Core Waku p2p functionality.
 */

import { createRelayNode, Waku, Decoder, IRelay, Encoder } from "@waku/sdk"
import protobuf from "protobufjs"
import { EncodedPayload, WakuNode } from "./types"

export { utf8ToBytes } from "@waku/sdk"

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
 * Shuts down the Waku node.
 */
export async function shutdownWaku(node: WakuNode) {
  // // For light node
  // await subscription.unsubscribe([systemTopic])

  // TODO need to unsubscribe

  await node.stop()
}

// =================================================================================================

/**
 * Sends a protobuf message of the given type, using the given encoder.
 */
export async function sendMessage(node: WakuNode, encoder: Encoder, msgType: protobuf.Type, msgPayload: any) {
  const protoMessage = msgType.create(msgPayload)
  const serialisedMessage = msgType.encode(protoMessage).finish()
  await node.relay.send(encoder, { payload: serialisedMessage })
}

// =================================================================================================