/**
 * Collection of types for use byt the p2p package.
 */

import { Vapor } from "@vapor/sdk/contract_types/Vapor"
import { Reader } from "protobufjs"
import { IRelay, RelayNode } from "@waku/sdk"

/** Type of Ethereum addresses. */
export type Address = `0x${string}`

/** Waku node that has a relay component. */
export type WakuNode = RelayNode & { relay: IRelay }

/** Type manifests: a list of pair of setting names and their types. */
export type Manifest = Vapor.SettingDeclarationStruct[]

/** String dictionary of the given type. */
export type DictionaryOf<T> = { [key: string]: T }

/** String dictionary with untype values. */
export type Dictionary = DictionaryOf<any>

/** Type of encoded payloads received from the Waku network. */
export type EncodedPayload = Reader | Uint8Array

/** Possible types of setting values. */
export enum ValueType {
  Bool,
  Int, // encoded as int256
  Uint, // encoded as uint256
  Address,
  Bytes,
  String,
  Enum // encoded as string
}