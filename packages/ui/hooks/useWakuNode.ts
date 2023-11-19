import { WakuNode, DecodedSystemMessage } from "@vapor/p2p"
import { useEffect, useState } from "react"
import * as p2p from "@vapor/p2p"
import { useStore } from "@store/store"
import { StoreActionTypes } from "@type/store"

export function useWakuNode(
  setStatus: (status: string) => void,
  msgCallback: (msg: DecodedSystemMessage) => void
): WakuNode | undefined {
  const { store, dispatch } = useStore()
  useEffect(() => {
    const asyncSetupWaku = async () => {
      const wakuNode = await p2p.setupWakuForSystem(setStatus, msgCallback)
      dispatch({ type: StoreActionTypes.SET_WAKU_NODE, payload: { wakuNode }})
      setStatus("Ready")
    }
    void asyncSetupWaku()
  }, [])

  return store.wakuNode
}