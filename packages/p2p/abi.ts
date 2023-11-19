/**
 * Utilities to encode and decode ABI-coded values.
 */

import { Dictionary, ValueType } from "./types"
import { ethers } from "ethers"

// =================================================================================================

/**
 * Converts a setting {@code ValueType} to a Solidity ABI type name that Ethers understands.
 * @param valueType
 */
export function valueTypeToAbiType(valueType: ValueType): string {
  switch (valueType) {
    case ValueType.Bool:
      return "bool"
    case ValueType.Int:
      return "int256"
    case ValueType.Uint:
      return "uint256"
    case ValueType.Address:
      return "address"
    case ValueType.Bytes:
      return "bytes"
    case ValueType.String:
      return "string"
    case ValueType.Enum:
      return "string"
    default:
      throw new Error(`Unknown value type ${valueType}`)
  }
}

// =================================================================================================

type Manifest = readonly { name: string; valueType: number; allowedValues: readonly string[]; }[]

/**
 * Maps a setting name to its type in a manifest. The returned value is a Solidity ABI type name
 * that Ethers understands.
 */
export function lookupSettingType(settingName: string, manifest: Manifest): string {
  const setting = manifest.find((setting) => setting.name === settingName)
  if (!setting) throw new Error(`Setting ${settingName} not found in manifest`)
  const valueType = ethers.BigNumber.from(setting.valueType).toNumber()
  return valueTypeToAbiType(valueType)
}

// =================================================================================================

/**
 * Encodes a list of setting values according to their types (looked up by name in the provided
 * manifest).
 */
export function abiEncodeSettings(manifest: Manifest, settingsNames: string[], settingsValues: any[]): string {
  const settingTypes = settingsNames.map((settingName) => lookupSettingType(settingName, manifest))
  return ethers.utils.defaultAbiCoder.encode(settingTypes, settingsValues)
}

// =================================================================================================

/**
 * Decodes a list of setting values that were encoded together according to their types (looked up
 * by name in the provided manifest).
 */
export function abiDecodeSettingsBytes(manifest: Manifest, settingsNames: string[], settingsValues: Uint8Array): Dictionary {
  const settingTypes = settingsNames.map((settingName) => lookupSettingType(settingName, manifest))
  const decodedArray = ethers.utils.defaultAbiCoder.decode(settingTypes, settingsValues)
  const dict: Dictionary = {}
  for (const [i, settingName] of settingsNames.entries()) {
    dict[settingName] = decodedArray[i]
  }
  return dict
}

// =================================================================================================

/**
 * Decodes a list of setting values that were encoded separately according to their types (looked up
 * by name in the provided manifest).
 */
export function abiDecodeSettingsArray(manifest: Manifest, settingsNames: string[], settingsValues: Uint8Array[]): Dictionary {
  const dict: Dictionary = {}
  for (const [i, settingName] of settingsNames.entries()) {
    const settingType = lookupSettingType(settingName, manifest)
    dict[settingName] = ethers.utils.defaultAbiCoder.decode([settingType], settingsValues[i])
  }
  return dict
}

// =================================================================================================