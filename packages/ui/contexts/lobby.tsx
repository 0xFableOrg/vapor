import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { useStore } from "@store/store"
import { GameSession } from "@type/common"

const defaultContext: Array<GameSession> = []

export const LobbyContext = createContext<Array<GameSession>>(defaultContext)

export const useLobby = (): Array<GameSession> => {
  const context = useContext(LobbyContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a LobbyProvider")
  }
  return context
}
