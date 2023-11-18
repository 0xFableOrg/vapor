import LobbyListActionButton from "@components/Button/LobbyListActionButton'";
import LobbyItem from "@components/Lobby/LobbyItem";
import React from "react";

const Lobby: React.FC = () => {
  // get lobby IDs from getJoinableSessions function in the contract
  // feed lobby ID to 'lobby/[id]', and page will fetch it from url state and get further data
  // store all sessions data in redux?

  // Example lobby IDs
  const lobbyIds = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col h-screen w-screen bg-black p-6 space-y-3">
      <h1 className="font-vapor text-white text-[30px]">VAPOR</h1>
      <main className="flex flex-col w-full h-full max-w-7xl mx-auto">
        <div className="flex flex-row-reverse">
          <span>
            <LobbyListActionButton onClick={() => {}} />
          </span>
        </div>
        <div className="flex flex-col items-start justify-start w-full h-full p-8 mt-4 border-[1px] border-white rounded-xl space-y-3 overflow-auto">
          {lobbyIds.map((id) => (
            <LobbyItem id={id} key={id} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Lobby;
