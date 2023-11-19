import LobbyListActionButton from "../../components/Button/LobbyListActionButton";
import LobbyItem from "@components/Lobby/LobbyItem";
import { ModalEnum, useModal } from "@contexts/modal";
import { useWakuNode } from "@hooks/useWakuNode";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { abiDecodeSettingsBytes } from "@vapor/p2p/abi";
import { SystemMessageType, sendSystemMessage, utf8ToBytes } from "@vapor/p2p";
import {
  useVaporGetInitialSettingsManifest,
  useVaporGetJoinableSessions,
} from "@hooks/generated";
import { useSignMessage } from "wagmi";
import { deployment } from "@utils/deployment";

type SessionData = {
  gameID: bigint;
  sessionID: bigint;
  joinableIndex: bigint;
  name: string;
  creator: `0x${string}`;
  status: number;
  initialSettings: `0x${string}`;
};

const Lobby: React.FC = () => {
  // get lobby IDs from getJoinableSessions function in the contract
  // feed lobby ID to 'lobby/[id]', and page will fetch it from url state and get further data
  // store all sessions data in redux?
  const router = useRouter();
  const { setModal } = useModal();
  const [sessionSelected, setSessionSelected] = useState<SessionData>();

  const { data: vaporGameSessionsData, isSuccess: isGameSessionSuccess } =
    useVaporGetJoinableSessions({address: deployment.Vapor});
  const { data: vaporGameConfigsData, isSuccess: isGameConfigSuccess } =
    useVaporGetInitialSettingsManifest({
      address: deployment.Vapor,
      args: sessionSelected?.gameID ? [sessionSelected.gameID] : undefined,
    });

  const { isWakuReady, wakuNode } = useWakuNode();
  const [isJoining, setIsJoining] = useState<boolean>(false);

  const { signMessageAsync } = useSignMessage();
  useEffect(() => {
    const asyncFn = () => {};

    if (isJoining) {
      void asyncFn();
    }
  }, [sessionSelected, isJoining]);

  const onJoinClicked = (item: SessionData) => async () => {
    if (
      isGameConfigSuccess &&
      isWakuReady &&
      wakuNode &&
      vaporGameConfigsData
    ) {
      setIsJoining(true);
      setSessionSelected(item);
      const settings = abiDecodeSettingsBytes(
        vaporGameConfigsData,
        vaporGameConfigsData.map((m) => m.name),
        utf8ToBytes(item.initialSettings)
      );
      await sendSystemMessage(wakuNode, {
        type: SystemMessageType.JoinGame,
        sessionID: Number(item.sessionID),
        settingsNames: Object.keys(settings),
        settingsValues: Object.values(settings),
        signFn: async (payload) => {
          return signMessageAsync({ message: payload });
        },
      });
      setIsJoining(false);
      // Set loading messages here
      router.push(`/lobby/${item.sessionID.toString()}`);
    }
  };
  return (
    <div className="flex flex-col h-screen w-screen bg-black p-6 space-y-3">
      <main className="flex flex-col h-full w-full">
        <h1 className="font-vapor text-white text-[30px]">VAPOR</h1>
        <div className="flex flex-row-reverse w-full max-w-7xl mx-auto">
          <span>
            <LobbyListActionButton
              onClick={() => {
                setModal(ModalEnum.CREATE_GAME_MODAL);
              }}
            />
          </span>
        </div>
        <div className="flex flex-col w-full max-w-7xl mx-auto items-start justify-start p-8 mt-4 border-[1px] border-white rounded-xl space-y-3 overflow-auto">
          {isGameSessionSuccess &&
            vaporGameSessionsData!.map((item) => (
              <LobbyItem
                creator={item.creator}
                currentSize={4}
                maxSize={5}
                gameId={item.gameID.toString()}
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
  );
};

export default Lobby;
