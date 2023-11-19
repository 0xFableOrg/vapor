import { providers } from 'ethers';
import { WakuNode } from "@vapor/p2p"

// eslint-disable-next-line
type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export enum StoreActionTypes {
  SET_ACCOUNT = "SET_ACCOUNT",
  SET_PROVIDER = "SET_PROVIDER",
  SET_BALANCE = "SET_BALANCE",
  SET_CHAIN_ID = "SET_CHAIN_ID",
  CLEAR_STATE = "CLEAR_STATE",
  SET_WAKU_NODE = "SET_WAKU_NODE",
}

export interface StoreState {
  provider?: providers.AlchemyProvider | providers.Web3Provider
  account?: string
  balance?: string
  chainId?: number
  wakuNode?: WakuNode
}

type StorePayload = {
  [StoreActionTypes.SET_ACCOUNT]: {
    account: string
  }
  [StoreActionTypes.SET_PROVIDER]: {
    provider?: providers.AlchemyProvider | providers.Web3Provider
  }
  [StoreActionTypes.SET_BALANCE]: {
    balance: string
  }
  [StoreActionTypes.SET_CHAIN_ID]: {
    chainId: number
  }
  [StoreActionTypes.SET_WAKU_NODE]: {
    wakuNode: WakuNode;
  }
  [StoreActionTypes.CLEAR_STATE]: undefined
}

export type StoreActions =
  ActionMap<StorePayload>[keyof ActionMap<StorePayload>]
