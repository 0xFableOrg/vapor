import React from "react"

import ConnectButton from "@components/Button/ConnectButton"

interface HeaderProps {} // eslint-disable-line

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="bg-black ">
      <div className="md:container md:mx-auto">
        <div className="flex flex-row items-center justify-between bg-black py-4">
          <span className="text-white font-vapor text-[45px] select-none">VAPOR</span>
          <div className="flex items-center space-x-6">
            <ConnectButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
