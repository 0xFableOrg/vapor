import Link from "next/link"
import React from "react"

const Lobby: React.FC = () => {
  // get lobby IDs from getJoinableSessions function in the contract
  // feed lobby ID to 'lobby/[id]', and page will fetch it from url state and get further data
  // store all sessions data in redux?

  // Example lobby IDs
  const lobbyIds = [1, 2, 3, 4, 5]

  return (
    <div>
      <h1>Select a Lobby</h1>
      {lobbyIds.map((id) => (
        <Link key={id} href={`/lobby/${id}`}>
          <a style={{ margin: "10px", display: "block" }}>Lobby {id}</a>
        </Link>
      ))}
    </div>
  )
}

export default Lobby
