import { Profile } from "@ensdomains/thorin"
import React from "react"

interface SessionPlayerProps {
  address: string | null
} 

const SessionPlayer: React.FC<SessionPlayerProps> = ({ address }) => {
  return (
    <div className="flex flex-row items-center justify-start w-full rounded-xl border-[1px] border-gray-600 p-2">
      <Profile address={address as string} size={'medium'} />
    </div>
  )
}

export default SessionPlayer
