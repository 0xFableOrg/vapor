import LobbyListActionButton from "../../components/Button/LobbyListActionButton"
import LobbyItem from "@components/Lobby/LobbyItem"
import { ModalEnum, useModal } from "@contexts/modal"
import { useVapor } from "@hooks/useVapor"
import { useWakuNode } from "@hooks/useWakuNode"
import { GameSession } from "@type/common"
import { Vapor } from "@vapor/sdk/contract_types"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { abiDecodeSettingsBytes } from "@vapor/p2p/abi";
import { useStore } from "@store/store"

const Lobby: React.FC = () => {
  // get lobby IDs from getJoinableSessions function in the contract
  // feed lobby ID to 'lobby/[id]', and page will fetch it from url state and get further data
  // store all sessions data in redux?
  const router = useRouter();
  const { setModal } = useModal();
  const { store } = useStore();
  const { isReady, vapor } = useVapor("");
  const { isWakuReady, wakuNode } = useWakuNode();
  const [lobbiesArray, setLobbiesArray] = useState<Vapor.SessionStructOutput[]>(
    []
  );


  const { account, provider } = store;

  // useEffect(() => {
  //   const asyncFn = async () => {
  //     const lobbies = await vapor!.listAllActiveLobbies();
  //     setLobbiesArray(lobbies);
  //   };
  //   if (isReady && vapor) {
  //     asyncFn();
  //   }
  // }, [isReady, vapor]);

  useEffect(() => {
  }, []);

  const onJoinClicked = (item: Vapor.SessionStructOutput) => async () => {

    if (isWakuReady && wakuNode && vapor) {
      // const settings = abiDecodeSettingsBytes(item.initialSettings);
      // const result = await vapor.joinLobby(wakuNode, item.sessionID, Object.keys(settings), Object.values(settings), (payload) => { store.provider?.getSigner(payload) });
    }
    // Set loading messages here
    router.push(`/lobby/${item.sessionID.toString()}`)
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-black p-6 space-y-3">
      <main className="flex flex-col h-full w-full">
        <h1 className="font-vapor text-white text-[30px]">VAPOR</h1>
        <div className="flex flex-row-reverse w-full max-w-7xl mx-auto">
          <span>
            <LobbyListActionButton
              onClick={() => {
                setModal(ModalEnum.CREATE_GAME_MODAL)
              }}
            />
          </span>
        </div>
        <div className="flex flex-col w-full max-w-7xl mx-auto items-start justify-start p-8 mt-4 border-[1px] border-white rounded-xl space-y-3 overflow-auto">
          {lobbiesArray.map((item) => (
            <LobbyItem
              creator={item.creator}
              currentSize={4}
              maxSize={5}
              gameId={item.gameID.toString()}
              isJoinable={item.joinableIndex.toNumber() !== 0}
              name={item.name}
              sessionId={item.sessionID.toString()}
              status={item.status}
              key={item.sessionID.toString()}
              onJoinClicked={onJoinClicked(item)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Lobby
