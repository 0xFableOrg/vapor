import React, { useCallback } from "react"
import { useRouter } from "next/router"

import { useStore } from "@store/store"
import { ModalEnum, useModal } from "@contexts/modal"

interface LandingSectionProps {} // eslint-disable-line

const LandingSection: React.FC<LandingSectionProps> = () => {
  const { store } = useStore()
  const { setModal } = useModal()

  const router = useRouter()
  const { account } = store

  const handleEntryClick = useCallback(() => {
    if (account) {
      router.push("/lobby")
    } else {
      // prompt user to connect
      setModal(ModalEnum.WALLET_MODAL)
    }
  }, [router, account, setModal])

  return (
    <div className="flex w-full h-[90vh] bg-black items-center justify-center">
      <button
        onClick={handleEntryClick}
        type="button"
        className="flex flex-row items-center font-capian text-[20px] justify-center px-10 py-10 font-medium text-center text-white border border-transparent select-none rounded-full shadow-sm bg-primary bg-[#405ca9] hover:bg-[#1b2646]"
      >
        enter
      </button>
    </div>
  )
}

export default LandingSection
