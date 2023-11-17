import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { toast } from "react-toastify"
import WalletConnectProvider from "@walletconnect/web3-provider"
import { providers } from "ethers"

import { useStore } from "@store/store"
import { StoreActionTypes } from "@type/store"

import { useModal } from "./modal"

export interface WalletContextProps {
  connected: boolean
  disconnect: () => void
}

const defaultContext: WalletContextProps = {
  connected: false,
  disconnect: () => null,
}

export const WalletContext = createContext<WalletContextProps>(defaultContext)

export const WalletProvider: React.FC = ({ children }) => {
  const [connected, setConnected] = useState(defaultContext.connected)
  const { store, dispatch } = useStore()
  const { hideModal } = useModal()
  const { provider, account } = store

  const handleDisconnect = async () => {
    if (
      provider instanceof providers.Web3Provider &&
      !provider.provider.isMetaMask
    ) {
      // isWalletConnect then
      await (provider.provider as WalletConnectProvider).disconnect()
      dispatch({ type: StoreActionTypes.CLEAR_STATE })
      toast.success("Wallet disconnected")
    } else {
      toast.error("You can only disconnect from Metamask")
    }
  }

  const onAccountChange = useCallback(() => {
    if (
      provider instanceof providers.Web3Provider &&
      provider.provider.isMetaMask
    ) {
      // eslint-disable-next-line
      ;(provider.provider as any).on("accountsChanged", (accounts: any) => {
        if (accounts.length === 0) {
          dispatch({ type: StoreActionTypes.CLEAR_STATE })
          toast.success("Wallet disconnected", {
            position: toast.POSITION.BOTTOM_LEFT,
          })
        }
      })
    }
  }, [dispatch, provider])

  useEffect(() => {
    onAccountChange()
  }, [onAccountChange])

  useEffect(() => {
    if (account) {
      setConnected(true)
      hideModal()
      toast.success("Wallet connected")
    } else setConnected(false)
  }, [account, hideModal])

  return (
    <WalletContext.Provider value={{ connected, disconnect: handleDisconnect }}>
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = (): WalletContextProps => {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
