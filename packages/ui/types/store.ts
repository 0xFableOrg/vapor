import { providers } from "ethers"
import { WakuNode } from "@vapor/p2p"
import { GameSession } from "./common"
import { Vapor } from '@vapor/sdk';

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
  SET_WAKU_NODE = "SET_WAKU_NODE",
  SET_ALL_ROOMS = 'SET_ALL_ROOMS',
  ADD_ROOM = "ADD_ROOM",
  SET_ROOM = "SET_ROOM",
  REMOVE_ROOM = "REMOVE_ROOM",
  CLEAR_STATE = "CLEAR_STATE",
  SET_VAPOR_INSTANCE = "SET_VAPOR_INSTANCE",
}

export interface StoreState {
  provider?: providers.AlchemyProvider | providers.Web3Provider
  account?: string
  balance?: string
  chainId?: number
  wakuNode?: WakuNode
  rooms?: GameSession[]
  vaporInstance?: Vapor,
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
    wakuNode: WakuNode
  }
  [StoreActionTypes.ADD_ROOM]: {
    room: GameSession
  }
  [StoreActionTypes.SET_ALL_ROOMS]: {
    rooms: GameSession[]
  }
  [StoreActionTypes.SET_ROOM]: {
    room: GameSession
  }
  [StoreActionTypes.REMOVE_ROOM]: {
    roomId: string
  }
  [StoreActionTypes.SET_VAPOR_INSTANCE]: {
    vaporInstance: Vapor;
  }
  [StoreActionTypes.CLEAR_STATE]: undefined
}

export type StoreActions =
  ActionMap<StorePayload>[keyof ActionMap<StorePayload>]
