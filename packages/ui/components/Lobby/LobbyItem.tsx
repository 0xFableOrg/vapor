import JoinLobbyActionButton from "@components/Button/JoinLobbyActionButton"
import { GameStatus } from "@type/common"
import Link from "next/link"
import { MouseEventHandler } from "react"
import GameStatusIndicator from "./GameStatusIndicator"

export type LobbyItemProps = {
  sessionId: string
  gameId: string
  name: string
  isJoinable: boolean
  creator: string
  status: GameStatus
  currentSize: number
  maxSize: number
  onJoinClicked: MouseEventHandler<HTMLButtonElement>
}

const LobbyItem: React.FC<LobbyItemProps> = ({
  name,
  sessionId,
  gameId,
  creator,
  isJoinable,
  currentSize,
  maxSize,
  status,
  onJoinClicked,
}) => {
  return (
    <div className="flex flex-col text-white font-capian border-[1px] border-white rounded-xl w-full p-4">
      <h2 className="text-[20px]">{name ?? "Placeholder"}</h2>
      <div className="flex flex-row space-x-4">
        <div className="flex flex-col flex-1">
          <span className="text-sm">Game {gameId}</span>
          <span className="text-sm">Session {sessionId}</span>
          <span className="text-sm">Created by {creator}</span>
        </div>
        <div className="flex flex-col flex-[0.15] items-center justify-center space-y-2">
          <span className="flex space-x-2 items-center justify-center">
            <span>
              {currentSize ?? 0} / {maxSize ?? 5}
            </span>
            <GameStatusIndicator status={status} />
          </span>
          <JoinLobbyActionButton
            onClick={onJoinClicked}
            disabled={status !== GameStatus.Created || !isJoinable}
          />
        </div>
      </div>
    </div>
  )
}

export default LobbyItem
