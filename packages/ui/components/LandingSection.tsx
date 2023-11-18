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
        className="flex flex-row items-center font-capian text-[20px] justify-center px-20 py-10 font-medium text-center text-white border-[1px] border-white select-none rounded-full shadow-sm"
        style={{
          backgroundImage: "url(/img/landingPageButton.jpeg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        enter
      </button>
    </div>
  )
}

export default LandingSection
