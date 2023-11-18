import React from "react"

interface LobbyChatProps {}

const LobbyChat: React.FC<LobbyChatProps> = () => {
  return (
    <div className="flex flex-col items-start justify-start p-4 w-[50%] h-full border-[1px] border-white rounded-xl space-y-3">
      <span className="text-white font-capian text-[20px]">chat</span>
      <div className="flex flex-col rounded-xl space-y-2 bg-gray-700 h-[65%] w-full relative">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url(/img/chatBg.jpeg)",
            opacity: 0.4,
          }}
        ></div>
      </div>
      <div className="flex w-full h-[15%] rounded-xl">
        <textarea
          //   value={message}
          //   onChange={handleMessageChange}
          placeholder={`Type your message here...`}
          //   onKeyDown={keyPressed}
          //   rows={1}
          //   cols={1}
          //   ref={textAreaRef}
          className="rounded-xl w-full bg-gray-300"
        />
      </div>
    </div>
  )
}

export default LobbyChat
