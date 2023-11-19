import React, { useCallback, useState } from "react"
import { utils } from "ethers"
import Image from "next/image"

import { useModal } from "@contexts/modal"
import { useStore } from "@store/store"
import { Identification, WalletType } from "@type/common"
import { StoreActionTypes } from "@type/store"
import { configMetamask, configWalletConnect } from "@utils/provider"

interface CreateGameModalProps {} // eslint-disable-line

const CreateGameModal: React.FC<CreateGameModalProps> = () => {
  const { dispatch } = useStore()
  const { setModal } = useModal()

  const [numberOfPlayers, setNumberOfPlayers] = useState<number>(0)
  const [identification, setIdentification] = useState<Identification>(
    Identification.ADDRESS
  )
  const identificationOptions = Object.keys(Identification).filter((key) =>
    isNaN(Number(key))
  )

  const getImagePath = (key: string) => {
    switch (Identification[key as keyof typeof Identification]) {
      case Identification.NEXTID:
        return "/img/metamask.svg"
      case Identification.WORLDID:
        return "/img/worldcoin.webp"
      case Identification.ADDRESS:
        return "/img/ens.png"
      default:
        return "" // Default or placeholder image path
    }
  }

  const handleCreateRoom = useCallback(() => {
    // web3 call to create room
  }, [])

  // initialSettingsManifest
  // confirm - web3 calls - createSession

  return (
    <div
      id="default-modal"
      className="fixed top-0 left-0 z-50 flex items-center justify-center w-full y-full h-modal backdrop-blur-sm"
    >
      <div className="relative w-full h-[600px] max-w-3xl px-4 md:h-auto">
        <div className="relative bg-black border-[1px] border-white rounded-xl shadow">
          <div className="flex items-center justify-between px-6 py-4 border-b rounded-t border-white">
            <span className="text-[25px] text-white font-capian">
              Room creation
            </span>
            <button
              type="button"
              className="text-white bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-white/10"
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

          <div className="flex flex-col items-start justify-center p-6 space-y-6">
            <span className="text-[20px] text-white font-capian">
              choose your room mix
            </span>
            <div className="flex flex-col w-full h-full space-y-5">
              <div className="flex flex-row items-center justify-between w-full">
                <span className="font-capian text-white text-[15px]">
                  number of participants
                </span>
                <div className="flex flex-row space-x-2 items-center justify-center">
                  {[1, 2, 3, 4, 5].map((number) => (
                    <button
                      key={number}
                      className={`text-white text-sm font-bold py-2 px-4 rounded mb-1 font-vapor text-[18px] ${
                        number === numberOfPlayers
                          ? "bg-blue-700"
                          : "bg-gray-500 hover:bg-blue-700"
                      }`}
                      onClick={() => setNumberOfPlayers(number)} // Replace with your actual event handler
                    >
                      {number}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-row items-center justify-between w-full">
                <span className="font-capian text-white text-[15px]">
                  identification
                </span>
                <div className="flex flex-row space-x-2 items-center justify-center">
                  {identificationOptions.map((key) => (
                    <button
                      key={key}
                      className={`text-white text-sm font-bold h-[50px] w-[50px] flex items-center justify-center rounded mb-1 font-vapor text-[18px] ${
                        Identification[key as keyof typeof Identification] ===
                        identification
                          ? "bg-blue-700"
                          : "bg-gray-500 hover:bg-blue-700"
                      }`}
                      onClick={() =>
                        setIdentification(
                          Identification[key as keyof typeof Identification]
                        )
                      }
                    >
                      <Image
                        src={getImagePath(key)}
                        alt={key}
                        width={30}
                        height={30}
                      />{" "}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex w-full items-center justify-center">
                <button
                  className="flex items-center justify-center w-[100px] h-[50px] rounded-xl bg-black  border-[1px] border-gray-400"
                  onClick={handleCreateRoom}
                >
                  <span className="text-white font-vapor text-[20px]">
                    create
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateGameModal
