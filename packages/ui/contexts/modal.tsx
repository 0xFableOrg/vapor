import React, { createContext, useCallback, useContext, useState } from "react"

import WalletModal from "@components/Modal/WalletModal"

export enum ModalEnum {
  WALLET_MODAL = "wallet-modal",
  AUCTION_MODAL = "auction-modal",
  INFO_MODAL = "info-modal",
  REQUEST_MODAL = "request-modal",
}

export interface ModalContextProps {
  modal: ModalEnum | null
  setModal: (modal: ModalEnum|null) => void
  hideModal: () => void
}

const defaultContext: ModalContextProps = {
  modal: null,
  setModal: () => null,
  hideModal: () => null,
}

export const ModalContext = createContext<ModalContextProps>(defaultContext)

export const ModalProvider: React.FC = ({ children }) => {
  const [modal, setModal] = useState(defaultContext.modal)
  const hideModal = useCallback(() => setModal(null), [setModal])

  return (
    <ModalContext.Provider
      value={{
        ...defaultContext,
        modal,
        setModal,
        hideModal,
      }}
    >
      {children}
      {modal == ModalEnum.WALLET_MODAL && <WalletModal />}
    </ModalContext.Provider>
  )
}

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider")
  }
  return context
}
