// pages/lobby/[id].tsx
import { useRouter } from "next/router"
import { useEffect, useState, ReactElement } from "react"
import { NextPage } from "next"
import LobbyActionButton from "@components/Button/LobbyActionButton"
import { LobbyButtonType } from "@type/common"
import SessionPlayer from "@components/Lobby/SessionPlayer"
import SelectedLobbyConfig from "@components/Lobby/SelectedLobbyConfig"

const LobbyIdPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  // define a LobbySession type to get data from contract
  const [lobbyData, setLobbyData] = useState<string | null>(null)

  useEffect(() => {
    if (typeof id === "string") {
      setLobbyData(`Data for lobby ${id}`)
    }
  }, [id])

  if (!lobbyData)
    return (
      <div className="flex flex-col h-screen w-screen bg-black p-6 items-center justify-center">
        <span className="font-capian text-white text-[30px]">Loading...</span>
      </div>
    )

  return (
    <div className="flex flex-col h-screen w-screen bg-black p-6 space-y-3">
      <h1 className="font-capian text-white text-[30px]">Lobby {id}</h1>
      <div className="flex flex-row w-full h-[60%] space-x-4">
        <div className="flex flex-col items-start justify-start p-4 w-[50%] h-full border-[1px] border-white rounded-xl space-y-3">
          <span className="text-white font-capian text-[20px]">Players</span>

          {/* @todo get players from contract, iterate through them */}
          <SessionPlayer
            address={`0x413C841B1af94ae352A080E9Acf25Fd9be5211c9`}
          />
        </div>
        <SelectedLobbyConfig />
      </div>
      <div className="flex flex-row w-full h-[20%] space-x-4 items-center justify-center spacex-4">
        <LobbyActionButton type={LobbyButtonType.START} />
        <LobbyActionButton type={LobbyButtonType.QUIT} />
      </div>
    </div>
  )
}

export default LobbyIdPage
