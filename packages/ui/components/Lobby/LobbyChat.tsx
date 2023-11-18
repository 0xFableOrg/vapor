import React from "react"

interface LobbyChatProps {}

const LobbyChat: React.FC<LobbyChatProps> = () => {
  return (
    <div
      className="flex flex-col items-start justify-start p-4 w-[50%] h-full border-[1px] border-white rounded-xl space-y-3 relative"
      style={{
        backgroundImage: "url(/img/chatBg.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <span className="text-white font-capian text-[20px] z-10">chat</span>
      <div className="flex flex-col rounded-xl space-y-2 bg-gray-700 bg-opacity-50 h-[65%] w-full z-10">
        {/* Content goes here */}
      </div>
      <div className="flex w-full h-[15%] rounded-xl z-10">
        <textarea
          placeholder={`Type your message here...`}
          className="rounded-xl w-full bg-gray-300"
        />
      </div>
    </div>
  )
}

export default LobbyChat
