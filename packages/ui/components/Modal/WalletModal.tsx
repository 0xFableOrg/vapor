import React, { useCallback } from "react"
import { utils } from "ethers"
import Image from "next/image"

import { useModal } from "@contexts/modal"
import { useStore } from "@store/store"
import { WalletType } from "@type/common"
import { StoreActionTypes } from "@type/store"
import { configMetamask, configWalletConnect } from "@utils/provider"

interface WalletModalProps {} // eslint-disable-line

const WalletModal: React.FC<WalletModalProps> = () => {
  const { dispatch } = useStore()
  const { setModal } = useModal()

  const handleConnectWallet = useCallback(
    async (wallet: WalletType) => {
      try {
        const { account, provider } =
          wallet === WalletType.WALLET_CONNECT
            ? await configWalletConnect(dispatch)
            : await configMetamask(dispatch)

        if (account) {
          const balance = await provider?.getBalance(account)
          balance &&
            dispatch({
              type: StoreActionTypes.SET_BALANCE,
              payload: { balance: utils.formatEther(balance) },
            })
        }
      } catch (error) {
        console.error(error)
      } finally {
      }
    },
    [dispatch]
  )

  return (
    <div
      id="default-modal"
      className="fixed top-0 left-0 z-50 flex items-center justify-center w-full y-full h-modal"
    >
      <div className="relative w-full h-full max-w-md px-4 md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between px-6 py-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
              Connect wallet
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => {
                setModal(null)
              }}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="p-6">
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Connect with one of our available wallet providers or create a new
              one.
            </p>
            <ul className="my-4 space-y-3">
              <li>
                <button
                  onClick={() => handleConnectWallet(WalletType.METAMASK)}
                  className="flex items-center w-full p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                >
                  <Image
                    className="h-[20px] w-[20px]"
                    width={20}
                    height={20}
                    src="/img/metamask.svg"
                    alt="metamask"
                  />
                  <span className="flex-1 ml-6 text-left whitespace-nowrap">
                    MetaMask
                  </span>
                  <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
                    Popular
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleConnectWallet(WalletType.WALLET_CONNECT)}
                  className="flex items-center w-full p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                >
                  <Image
                    className="h-[20px] w-[20px]"
                    width={20}
                    height={20}
                    src="/img/walletconnect.svg"
                    alt="wallet connect"
                  />
                  <span className="flex-1 ml-6 text-left whitespace-nowrap">
                    WalletConnect
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WalletModal
