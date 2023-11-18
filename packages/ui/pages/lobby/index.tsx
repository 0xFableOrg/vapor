import LobbyListActionButton from "@components/Button/LobbyListActionButton";
import LobbyItem from "@components/Lobby/LobbyItem";
import { GameSession, GameStatus } from "@type/common";
import { useRouter } from "next/router";
import React from "react";

const Lobby: React.FC = () => {
  // get lobby IDs from getJoinableSessions function in the contract
  // feed lobby ID to 'lobby/[id]', and page will fetch it from url state and get further data
  // store all sessions data in redux?
  const router = useRouter();

  // Example lobby IDs
  const lobbyItems: Array<GameSession> = [
    {
      creator: "0x123123123",
      gameID: "5",
      joinableIndex: 4,
      name: "Started Game",
      sessionID: "123",
      status: GameStatus.Started,
    },
    {
      creator: "0x123123124",
      gameID: "6",
      joinableIndex: 3,
      name: "Created Game",
      sessionID: "155",
      status: GameStatus.Created,
    },
    {
      creator: "0x123123124",
      gameID: "6",
      joinableIndex: 0,
      name: "Created Game Not Joinable",
      sessionID: "156",
      status: GameStatus.Created,
    },
    {
      creator: "0x123123125",
      gameID: "5",
      joinableIndex: 3,
      name: "Completed Game",
      sessionID: "157",
      status: GameStatus.Completed,
    },
  ];

  return (
    <div className="flex flex-col h-screen w-screen bg-black p-6 space-y-3">
      <main className="flex flex-col h-full w-full">
        <h1 className="font-vapor text-white text-[30px]">VAPOR</h1>
        <div className="flex flex-row-reverse w-full max-w-7xl mx-auto">
          <span>
            <LobbyListActionButton onClick={() => {}} />
          </span>
        </div>
        <div className="flex flex-col w-full max-w-7xl mx-auto items-start justify-start p-8 mt-4 border-[1px] border-white rounded-xl space-y-3 overflow-auto">
          {lobbyItems.map((item) => (
            <LobbyItem
              creator={item.creator}
              currentSize={4}
              maxSize={5}
              gameId={item.gameID}
              isJoinable={item.joinableIndex !== 0}
              name={item.name}
              sessionId={item.sessionID}
              status={item.status}
              key={item.sessionID}
              onJoinClicked={() => {
                router.push(`/lobby/${item.sessionID}`);
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Lobby;
