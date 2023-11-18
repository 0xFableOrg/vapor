import Link from "next/link"
import React from "react"

const Lobby: React.FC = () => {
  // get lobby IDs from getJoinableSessions function in the contract
  // feed lobby ID to 'lobby/[id]', and page will fetch it from url state and get further data
  // store all sessions data in redux?

  // Example lobby IDs
  const lobbyIds = [1, 2, 3, 4, 5]

  return (
    <div className="flex flex-col h-screen w-screen bg-black p-6 space-y-3">
      <h1 className="font-vapor text-white text-[30px]">VAPOR</h1>
      {lobbyIds.map((id) => (
        <Link key={id} href={`/lobby/${id}`}>
          <span className="text-white text-[20px] font-capian">
            <a style={{ margin: "10px", display: "block" }}>Lobby {id}</a>
          </span>
        </Link>
      ))}
    </div>
  )
}

export default Lobby
