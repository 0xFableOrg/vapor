import { BigNumber, ethers } from "ethers";
import { Vapor as VaporContract, Vapor__factory } from "./contract_types";

interface IVapor {
  createNewGame(): BigNumber;
  createLobby(gameId: BigNumber): BigNumber;
  startGame(): void;
  endGame(): void;
  joinLobby(gameId: BigNumber, sessionId: BigNumber): void;
  listGames(skip: number, take: number): void;
  listAllActiveLobbies(gameId: BigNumber): void;
}

export class Vapor implements IVapor {
  private readonly provider;
  private readonly VaporContract: VaporContract;
  constructor(
    private readonly vaporContract: string,
    private readonly rpcUrl: string
  ) {
    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    this.VaporContract = Vapor__factory.connect(
      this.vaporContract,
      this.provider
    );
  }

  async listGames(
    skip: number,
    take: number
  ): Promise<VaporContract.GameConfigStruct[]> {
    const fromId = skip;
    let games: VaporContract.GameConfigStruct[] = [];
    for (let i = fromId; i < fromId + take; i++) {
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
  createNewGame(): BigNumber {
    throw new Error("Method not implemented.");
  }
  createLobby(
    gameId: BigNumber // , listener callback
  ): BigNumber {
    // create game session will create a runnign listener
    // that will actively listen to new players wanting to join this lobby
    throw new Error("Method not implemented.");
  }
  joinLobby(gameId: BigNumber, sessionId: BigNumber): void {
    throw new Error("Method not implemented.");
  }
  startGame(): void {
    throw new Error("Method not implemented.");
  }
  endGame(): void {
    throw new Error("Method not implemented.");
  }
}
