import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from './hooks'
import { setLoggedIn } from './stores/UserStore'
import { setRoomJoined } from './stores/RoomStore'

import phaserGame from './PhaserGame'
import Game from './scenes/Game'
import Bootstrap from './scenes/Bootstrap'

import RoomSelectionDialog from './components/RoomSelectionDialog'
import LoginDialog from './components/LoginDialog'
import ComputerDialog from './components/ComputerDialog'
import WhiteboardDialog from './components/WhiteboardDialog'
import VideoConnectionDialog from './components/VideoConnectionDialog'
import Chat from './components/Chat'
import HelperButtonGroup from './components/HelperButtonGroup'
import MobileVirtualJoystick from './components/MobileVirtualJoystick'

import Adam from './images/login/Adam_login.png'
import Ash from './images/login/Ash_login.png'
import Lucy from './images/login/Lucy_login.png'
import Nancy from './images/login/Nancy_login.png'


const Backdrop = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`

type GameInitData = {
  room: string;
  password: string;
  name: string;
  avatar: string;
}

const avatars = [
  { name: 'adam', img: Adam },
  { name: 'ash', img: Ash },
  { name: 'lucy', img: Lucy },
  { name: 'nancy', img: Nancy },
]

for (let i = avatars.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1))
  ;[avatars[i], avatars[j]] = [avatars[j], avatars[i]]
}

function App() {
  const loggedIn = useAppSelector((state) => state.user.loggedIn)
  const computerDialogOpen = useAppSelector((state) => state.computer.computerDialogOpen)
  const whiteboardDialogOpen = useAppSelector((state) => state.whiteboard.whiteboardDialogOpen)
  const videoConnected = useAppSelector((state) => state.user.videoConnected)
  const roomJoined = useAppSelector((state) => state.room.roomJoined)
  const game = phaserGame.scene.keys.game as Game
  const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap

  const dispatch = useAppDispatch()
  const { room, password, name, avatar } = useParams<GameInitData>()

  React.useEffect(() => {
    const avatarIndex = avatars.findIndex((elem) => elem.name === avatar)
    console.log('Join! Name:', name, 'Avatar:', avatars[avatarIndex].name)
    game.registerKeys()
    game.myPlayer.setPlayerName(name!)
    game.myPlayer.setPlayerTexture(avatars[avatarIndex].name)
    game.network.readyToConnect()
    dispatch(setLoggedIn(true))

    bootstrap.network
      .joinCustomById(room!, password!)
      .then(() => bootstrap.launchGame())  // dispatch(setRoomJoined(true))
      .catch((error) => {
        console.error(error)
      })
    dispatch(setRoomJoined(true))
  }, [room, password, name, avatar])

  let ui: JSX.Element
  if (loggedIn) {
    if (computerDialogOpen) {
      /* Render ComputerDialog if user is using a computer. */
      ui = <ComputerDialog />
    } else if (whiteboardDialogOpen) {
      /* Render WhiteboardDialog if user is using a whiteboard. */
      ui = <WhiteboardDialog />
    } else {
      ui = (
        /* Render Chat or VideoConnectionDialog if no dialogs are opened. */
        <>
          <Chat />
          {/* Render VideoConnectionDialog if user is not connected to a webcam. */}
          {!videoConnected && <VideoConnectionDialog />}
          <MobileVirtualJoystick />
        </>
      )
    }
  } else if (roomJoined) {
    /* Render LoginDialog if not logged in but selected a room. */
    ui = <LoginDialog />
  } else {
    /* Render RoomSelectionDialog if yet selected a room. */
    ui = <RoomSelectionDialog />
  }

  return (
    <Backdrop>
      {ui}
      {/* Render HelperButtonGroup if no dialogs are opened. */}
      {!computerDialogOpen && !whiteboardDialogOpen && <HelperButtonGroup />}
    </Backdrop>
  )
}

export default App
