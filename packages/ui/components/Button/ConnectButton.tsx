import React from "react"

import { ModalEnum, useModal } from "@contexts/modal"
import { useWallet } from "@contexts/wallet"
import { useStore } from "@store/store"
import { shortenAddress } from "@utils/tool"

interface ConnectButtonProps {} // eslint-disable-line

const ConnectButton: React.FC<ConnectButtonProps> = () => {
  const { connected } = useWallet()
  const { setModal } = useModal()
  const { store } = useStore()
  const { account } = store

  const handleConnect = () => {
    if (!connected) setModal(ModalEnum.WALLET_MODAL)
    if (connected) return
  }

  return (
    <button
      onClick={handleConnect}
      type="button"
      className="flex flex-row items-center font-vapor text-[20px] justify-center px-6 py-2 mr-8 font-medium text-center text-white border border-transparent select-none rounded-md shadow-sm bg-primary bg-[#4e6e5c] hover:bg-green-800"
    >
      {!connected ? "connect" : shortenAddress(account, 3)}
    </button>
  )
}

export default ConnectButton
