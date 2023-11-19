import { BigNumber, BytesLike, Signer, ethers } from "ethers";
import { DemoGame__factory, Vapor as VaporContract, DemoGame as DemoGameContract, Vapor__factory } from "./contract_types"
import { Address, SystemMessageType, WakuNode, sendSystemMessage, utf8ToBytes } from "@vapor/p2p"

interface IVapor {
  createNewGame(config: VaporContract.GameConfigStruct): Promise<BigNumber>;
  createLobby(
    gameId: BigNumber,
    name: string,
    initialSettings: BytesLike,
    conditionalCallback: () => void // , listener callback
  ): Promise<BigNumber>;
  startGame(
    sessionID: BigNumber,
    players: string[],
    startSettings: BytesLike,
    playerSettings: BytesLike[],
    startGameCallBack: () => void
  ): Promise<void>;
  endGame(sessionId: BigNumber): Promise<void>;
  joinLobby(wakuNode: WakuNode, sessionId: BigNumber, settingsNames: string[], settingsValues: Uint8Array[], signFn: (payload: string) => string | Promise<string>): void;
  listGames(
  ): Promise<VaporContract.GameConfigStruct[]>;
  listAllActiveLobbies(
    gameId: BigNumber
  ): Promise<VaporContract.SessionStructOutput[]>;
}

export class Vapor implements IVapor {
  readonly VaporContract: VaporContract;
  readonly DemoGameContract: DemoGameContract;
  constructor(
    private readonly vaporContract: string,
    private readonly demoGameContract: string,
    private readonly signer: Signer
  ) {
    this.VaporContract = Vapor__factory.connect(
      this.vaporContract,
      this.signer
    );
    this.DemoGameContract = DemoGame__factory.connect(
      this.demoGameContract,
      this.signer
    );
  }

  async listGames(
  ): Promise<VaporContract.GameConfigStruct[]> {
    let games: VaporContract.GameConfigStruct[] = [];
    const nextId = await this.VaporContract.nextGameID();
    for (let i = 0; i < nextId.toNumber(); i++) {
      const game = await this.VaporContract.gameConfigs(i);
      games.push(game as unknown as VaporContract.GameConfigStruct);
    }
    return games;
  }

  async listAllActiveLobbies(
    gameId?: BigNumber
  ): Promise<VaporContract.SessionStructOutput[]> {
    // throw new Error("Method not implemented.");
    let sessions = await this.VaporContract.getJoinableSessions();
    if (gameId) {
      sessions = sessions.filter((x) => x.gameID === gameId);
    }
    return sessions;
  }

  async createNewGame(
    config: VaporContract.GameConfigStruct
  ): Promise<BigNumber> {
    const tx = await this.VaporContract.registerGame(config);
    const receipt = await tx.wait();

    const data = receipt.events![0].data;
    const result = this.VaporContract.interface.decodeEventLog(
      "GameRegistered",
      data
    );
    return BigNumber.from(result[0]);
  }

  async createLobby(
    gameId: BigNumber,
    name: string,
    initialSettings: BytesLike,
  ): Promise<BigNumber> {
    const tx = await this.VaporContract.createSession(
      gameId,
      name,
      initialSettings
    );
    const receipt = await tx.wait();

    const data = receipt.events![0].data;
    const result = this.VaporContract.interface.decodeEventLog(
      "GameCreated",
      data
    );

    const sessionId = BigNumber.from(result[1]);
    return sessionId;
  }

  async joinLobby(wakuNode: WakuNode, sessionId: BigNumber, settingsNames: string[], settingsValues: Uint8Array[], signFn: (payload: string) => string | Promise<string>) {
    await sendSystemMessage(wakuNode, {
      type: SystemMessageType.JoinGame,
      sessionID: sessionId.toNumber(),
      settingsNames,
      settingsValues,
      signFn
    })
  }

  async startGame(
    sessionID: BigNumber,
    players: string[],
    startSettings: BytesLike,
    playerSettings: BytesLike[],
    startGameCallBack: () => void
  ): Promise<void> {
    const tx = await this.VaporContract.startSession(
      sessionID,
      players,
      startSettings,
      playerSettings
    );

    const receipt = await tx.wait();

    startGameCallBack();
  }

  async endGame(sessionId: BigNumber): Promise<void> {
    await this.VaporContract.completeSession(sessionId);
  }
}
