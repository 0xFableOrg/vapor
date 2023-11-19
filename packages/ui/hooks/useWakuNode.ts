import { WakuNode } from "@vapor/p2p"
import { useEffect, useState } from "react"
import * as p2p from "@vapor/p2p"
import { useStore } from "@store/store"
import { StoreActionTypes } from "@type/store"

export function useWakuNode(
  callback: (status: string) => void
): { wakuNode: WakuNode | undefined, isWakuReady: boolean } {
  const { store, dispatch } = useStore()
  const [isWakuReady, setIsWakuReady] = useState(false);

  useEffect(() => {
    const asyncSetupWaku = async () => {
      const wakuNode = await p2p.setupWakuForSystem(callback)
      dispatch({ type: StoreActionTypes.SET_WAKU_NODE, payload: { wakuNode } })
      setIsWakuReady(true)
    }
    if(!isWakuReady) {
      void asyncSetupWaku()

    }
  }, [])

  return { wakuNode: store.wakuNode, isWakuReady }
}