import { Client, Room } from 'colyseus.js'
import { IOfficeState } from '../../types/IOfficeState'
import { IRoomData, RoomType } from '../../types/Rooms'
import { useStore } from '@store/store'
import { StoreActionTypes } from '@type/store'
import { GameSession, GameStatus } from "@type/common";
import { ethers, BigNumber } from 'ethers'

import { Vapor } from '@vapor/sdk'

export default class Network {
  private client: Client
  private lobby!: Room
  private room?: Room<IOfficeState>
  private vapor?: Vapor

  mySessionId!: string

  constructor() {

    // const protocol = window.location.protocol.replace('http', 'ws')
    // const endpoint =
    //   process.env.NODE_ENV === 'production'
    //     ? process.env.GAME_SERVER_URL
    //     : `${protocol}//${window.location.hostname}:2567`
    // this.client = new Client(endpoint)
    // this.joinLobbyRoom().then(() => {
    //   console.log("joined lobby room")
    // })
    const { store } = useStore()
    const { provider } = store

    const signer = provider?.getSigner()
    if (signer) {
      this.vapor = new Vapor('', signer)
    }
  }

  async createLobby(id: BigNumber, name: string) {
    await this.vapor?.createLobby(
      id,
      name,
      new bytes(),
      function () {},
    )
  }

  async joinLobbyRoom() {
    const { dispatch } = useStore()
    this.lobby = await this.client.joinOrCreate(RoomType.LOBBY)

    this.lobby.onMessage('rooms', (rooms) => {
      const gameSessions: Array<GameSession> = rooms.map((room: any) => {
        return {
          creator: ethers.Wallet.createRandom().address,
          gameID: room.roomId,
          joinableIndex: 4,
          name: room.roomId,
          sessionID: '',
          status: GameStatus.Created,
        }
      })
      dispatch({
        type: StoreActionTypes.SET_ALL_ROOMS,
        payload: {
          rooms: gameSessions,
        }
      })
    })

    this.lobby.onMessage('+', ([roomId, room]) => {
      dispatch({
        type: StoreActionTypes.ADD_ROOM,
        payload: {
          room: {
            creator: ethers.Wallet.createRandom().address,
            gameID: roomId,
            joinableIndex: 4,
            name: roomId,
            sessionID: '',
            status: GameStatus.Created,
          },
        }
      })
    })

    this.lobby.onMessage('-', (roomId) => {
      dispatch({
        type: StoreActionTypes.REMOVE_ROOM,
        payload: {
          roomId: roomId,
        }
      })
    })
  }

  // method to create a custom room
  async createCustom(roomData: IRoomData) {
    const { name, description, password, autoDispose } = roomData
    this.room = await this.client.create(RoomType.CUSTOM, {
      name,
      description,
      password,
      autoDispose,
    })
  }
}
