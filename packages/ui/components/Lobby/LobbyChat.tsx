import React, { useCallback, useRef, useState } from "react"
import useAutosizeTextArea from "@hooks/useAutosizeTextArea"

interface LobbyChatProps {}

const LobbyChat: React.FC<LobbyChatProps> = () => {
  const [message, setMessage] = useState<string>("")

  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  useAutosizeTextArea(textAreaRef.current, message)

  const handleMessageInput = useCallback((e: any) => {
    setMessage(e.target.value)
  }, [])

  const keyPressed = useCallback(
    async (event) => {
      if (event.key == "Enter" && !event.shiftKey && message !== "") {
        event.preventDefault()
        // handleSendMessage()
        // @todo send message via waku
      }
    },
    [message]
  )
  return (
    <div
      className="flex flex-col items-start justify-start p-4 w-[50%] h-full border-[1px] border-white rounded-xl space-y-3 relative"
      style={{
        backgroundImage: "url(/img/chatBg.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <span className="text-white font-capian text-[20px]">chat</span>
      <div className="flex flex-col rounded-xl space-y-2 bg-gray-700 bg-opacity-50 h-[70%] w-full z-10 overflow-y-auto overflow-x-hidden overscroll-none">
        {/* Content goes here */}
      </div>
      <div className="flex w-full h-[15%] rounded-xl z-10">
        <textarea
          placeholder={`type your message here...`}
          className="rounded-xl w-full bg-gray-300"
          onChange={handleMessageInput}
          onKeyDown={keyPressed}
          ref={textAreaRef}
        />
      </div>
    </div>
  )
}

export default LobbyChat
