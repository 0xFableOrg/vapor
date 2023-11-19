import { GameStatus } from "@type/common"

export type GameStatusIndicatorProps = {
  status: GameStatus
}

const GameStatusIndicator: React.FC<GameStatusIndicatorProps> = ({
  status,
}) => {
  switch (status) {
    case GameStatus.Started:
      return (
        <span className="relative inline-flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400"></span>
        </span>
      )
    case GameStatus.Completed:
      return (
        <span className="relative inline-flex h-3 w-3">
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
        </span>
      )
    case GameStatus.Created:
      return (
        <span className="relative inline-flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
        </span>
      )
    default:
      return (
        <span className="relative inline-flex h-3 w-3">
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
        </span>
      )
  }
}

export default GameStatusIndicator
