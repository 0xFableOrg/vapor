export enum WalletType {
  METAMASK = "metamask",
  WALLET_CONNECT = "wallet-connect",
}

export enum LobbyButtonType {
  START,
  QUIT,
}

export enum GameStatus {
  Created,
  Started,
  Completed,
}

export type GameSession = {
  gameID: string
  sessionID: string
  joinableIndex: number
  name: string
  creator: string
  status: GameStatus
}

export enum ValueType {
  Bool,
  Int,
  Uint,
  Address,
  Bytes,
  String,
  Enum,
}

export enum Identification {
  WORLDID,
  NEXTID,
  ADDRESS,
}
