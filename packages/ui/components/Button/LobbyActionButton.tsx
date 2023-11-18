import { LobbyButtonType } from "@type/common"
import React, { useState } from "react"

interface LobbyActionButtonProps {
  type: LobbyButtonType
}

const LobbyActionButton: React.FC<LobbyActionButtonProps> = ({ type }) => {
  const [hover, setHover] = useState(false)
  const buttonStyle = {
    transition: "background-image 0.5s ease-in-out",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundImage: hover
      ? type === LobbyButtonType.START
        ? 'url("/img/playButtonBg.png")'
        : 'url("/img/quitButtonBg.jpeg")'
      : "none",
  }
  // @todo on-click function to join game (sdk)
  return (
    <button
      className="flex items-center justify-center p-8 w-1/3 border border-white"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={buttonStyle}
    >
      <span className="font-vapor text-white text-2xl">
        {type === LobbyButtonType.START ? `start` : `quit`}
      </span>
    </button>
  )
}

export default LobbyActionButton
