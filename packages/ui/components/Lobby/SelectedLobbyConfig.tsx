import React from "react"

interface SelectedLobbyProps {}

const SelectedLobbyConfig: React.FC<SelectedLobbyProps> = () => {
  return (
    <div className="flex flex-col items-start justify-start p-4 w-[50%] h-full border-[1px] border-white rounded-xl space-y-3">
      <span className="text-white font-capian text-[20px]">Lobby Settings</span>

      
    </div>
  )
}

export default SelectedLobbyConfig
