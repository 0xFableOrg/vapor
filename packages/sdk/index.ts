interface IVapor {
  startGame(): void;
  endGame(): void;
}

export class Vapor implements IVapor {
  constructor(private readonly vaporContract: string) {}
  startGame(): void {
    throw new Error("Method not implemented.");
  }
  endGame(): void {
    throw new Error("Method not implemented.");
  }
}
