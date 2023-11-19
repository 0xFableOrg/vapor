/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export declare namespace Vapor {
  export type SettingDeclarationStruct = {
    name: string;
    valueType: BigNumberish;
    allowedValues: string[];
  };

  export type SettingDeclarationStructOutput = [string, number, string[]] & {
    name: string;
    valueType: number;
    allowedValues: string[];
  };

  export type SessionStruct = {
    gameID: BigNumberish;
    sessionID: BigNumberish;
    joinableIndex: BigNumberish;
    name: string;
    creator: string;
    status: BigNumberish;
    initialSettings: BytesLike;
  };

  export type SessionStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    string,
    number,
    string
  ] & {
    gameID: BigNumber;
    sessionID: BigNumber;
    joinableIndex: BigNumber;
    name: string;
    creator: string;
    status: number;
    initialSettings: string;
  };

  export type GameConfigStruct = {
    gameID: BigNumberish;
    name: string;
    authority: string;
    initialSettingsManifest: Vapor.SettingDeclarationStruct[];
    startSettingsManifest: Vapor.SettingDeclarationStruct[];
    playerSettingsManifest: Vapor.SettingDeclarationStruct[];
    sendInitialSettings: any;
    startCallback: any;
  };

  export type GameConfigStructOutput = [
    BigNumber,
    string,
    string,
    Vapor.SettingDeclarationStructOutput[],
    Vapor.SettingDeclarationStructOutput[],
    Vapor.SettingDeclarationStructOutput[],
    any,
    any
  ] & {
    gameID: BigNumber;
    name: string;
    authority: string;
    initialSettingsManifest: Vapor.SettingDeclarationStructOutput[];
    startSettingsManifest: Vapor.SettingDeclarationStructOutput[];
    playerSettingsManifest: Vapor.SettingDeclarationStructOutput[];
    sendInitialSettings: any;
    startCallback: any;
  };
}

export interface VaporInterface extends utils.Interface {
  functions: {
    "completeSession(uint256)": FunctionFragment;
    "createSession(uint256,string,bytes)": FunctionFragment;
    "gameConfigs(uint256)": FunctionFragment;
    "getInitialSettingsManifest(uint256)": FunctionFragment;
    "getJoinableSessions()": FunctionFragment;
    "getPlayerSettingsManifest(uint256)": FunctionFragment;
    "getStartSettingsManifest(uint256)": FunctionFragment;
    "nextGameID()": FunctionFragment;
    "nextSessionID()": FunctionFragment;
    "registerGame((uint256,string,address,(string,uint8,string[])[],(string,uint8,string[])[],(string,uint8,string[])[],function,function))": FunctionFragment;
    "sessions(uint256)": FunctionFragment;
    "startSession(uint256,address[],bytes,bytes[])": FunctionFragment;
    "validateEnumValue(string[],string)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "completeSession"
      | "createSession"
      | "gameConfigs"
      | "getInitialSettingsManifest"
      | "getJoinableSessions"
      | "getPlayerSettingsManifest"
      | "getStartSettingsManifest"
      | "nextGameID"
      | "nextSessionID"
      | "registerGame"
      | "sessions"
      | "startSession"
      | "validateEnumValue"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "completeSession",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createSession",
    values: [BigNumberish, string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "gameConfigs",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getInitialSettingsManifest",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getJoinableSessions",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPlayerSettingsManifest",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getStartSettingsManifest",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "nextGameID",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "nextSessionID",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "registerGame",
    values: [Vapor.GameConfigStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "sessions",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "startSession",
    values: [BigNumberish, string[], BytesLike, BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "validateEnumValue",
    values: [string[], string]
  ): string;

  decodeFunctionResult(
    functionFragment: "completeSession",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createSession",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "gameConfigs",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getInitialSettingsManifest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getJoinableSessions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPlayerSettingsManifest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getStartSettingsManifest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "nextGameID", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "nextSessionID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerGame",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "sessions", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "startSession",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "validateEnumValue",
    data: BytesLike
  ): Result;

  events: {
    "GameCreated(uint256,uint256)": EventFragment;
    "GameRegistered(uint256)": EventFragment;
    "GameStarted(uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "GameCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GameRegistered"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GameStarted"): EventFragment;
}

export interface GameCreatedEventObject {
  gameID: BigNumber;
  sessionID: BigNumber;
}
export type GameCreatedEvent = TypedEvent<
  [BigNumber, BigNumber],
  GameCreatedEventObject
>;

export type GameCreatedEventFilter = TypedEventFilter<GameCreatedEvent>;

export interface GameRegisteredEventObject {
  gameID: BigNumber;
}
export type GameRegisteredEvent = TypedEvent<
  [BigNumber],
  GameRegisteredEventObject
>;

export type GameRegisteredEventFilter = TypedEventFilter<GameRegisteredEvent>;

export interface GameStartedEventObject {
  gameID: BigNumber;
  sessionID: BigNumber;
}
export type GameStartedEvent = TypedEvent<
  [BigNumber, BigNumber],
  GameStartedEventObject
>;

export type GameStartedEventFilter = TypedEventFilter<GameStartedEvent>;

export interface Vapor extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: VaporInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    completeSession(
      sessionID: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    createSession(
      gameID: BigNumberish,
      name: string,
      initialSettings: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    gameConfigs(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, string, any, any] & {
        gameID: BigNumber;
        name: string;
        authority: string;
        sendInitialSettings: any;
        startCallback: any;
      }
    >;

    getInitialSettingsManifest(
      gameID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[Vapor.SettingDeclarationStructOutput[]]>;

    getJoinableSessions(
      overrides?: CallOverrides
    ): Promise<[Vapor.SessionStructOutput[]]>;

    getPlayerSettingsManifest(
      gameID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[Vapor.SettingDeclarationStructOutput[]]>;

    getStartSettingsManifest(
      gameID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[Vapor.SettingDeclarationStructOutput[]]>;

    nextGameID(overrides?: CallOverrides): Promise<[BigNumber]>;

    nextSessionID(overrides?: CallOverrides): Promise<[BigNumber]>;

    registerGame(
      config_: Vapor.GameConfigStruct,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    sessions(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, string, string, number, string] & {
        gameID: BigNumber;
        sessionID: BigNumber;
        joinableIndex: BigNumber;
        name: string;
        creator: string;
        status: number;
        initialSettings: string;
      }
    >;

    startSession(
      sessionID: BigNumberish,
      players: string[],
      startSettings: BytesLike,
      playerSettings: BytesLike[],
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    validateEnumValue(
      allowedValues: string[],
      value: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  completeSession(
    sessionID: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  createSession(
    gameID: BigNumberish,
    name: string,
    initialSettings: BytesLike,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  gameConfigs(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, string, string, any, any] & {
      gameID: BigNumber;
      name: string;
      authority: string;
      sendInitialSettings: any;
      startCallback: any;
    }
  >;

  getInitialSettingsManifest(
    gameID: BigNumberish,
    overrides?: CallOverrides
  ): Promise<Vapor.SettingDeclarationStructOutput[]>;

  getJoinableSessions(
    overrides?: CallOverrides
  ): Promise<Vapor.SessionStructOutput[]>;

  getPlayerSettingsManifest(
    gameID: BigNumberish,
    overrides?: CallOverrides
  ): Promise<Vapor.SettingDeclarationStructOutput[]>;

  getStartSettingsManifest(
    gameID: BigNumberish,
    overrides?: CallOverrides
  ): Promise<Vapor.SettingDeclarationStructOutput[]>;

  nextGameID(overrides?: CallOverrides): Promise<BigNumber>;

  nextSessionID(overrides?: CallOverrides): Promise<BigNumber>;

  registerGame(
    config_: Vapor.GameConfigStruct,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  sessions(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, string, string, number, string] & {
      gameID: BigNumber;
      sessionID: BigNumber;
      joinableIndex: BigNumber;
      name: string;
      creator: string;
      status: number;
      initialSettings: string;
    }
  >;

  startSession(
    sessionID: BigNumberish,
    players: string[],
    startSettings: BytesLike,
    playerSettings: BytesLike[],
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  validateEnumValue(
    allowedValues: string[],
    value: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    completeSession(
      sessionID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    createSession(
      gameID: BigNumberish,
      name: string,
      initialSettings: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    gameConfigs(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, string, any, any] & {
        gameID: BigNumber;
        name: string;
        authority: string;
        sendInitialSettings: any;
        startCallback: any;
      }
    >;

    getInitialSettingsManifest(
      gameID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<Vapor.SettingDeclarationStructOutput[]>;

    getJoinableSessions(
      overrides?: CallOverrides
    ): Promise<Vapor.SessionStructOutput[]>;

    getPlayerSettingsManifest(
      gameID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<Vapor.SettingDeclarationStructOutput[]>;

    getStartSettingsManifest(
      gameID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<Vapor.SettingDeclarationStructOutput[]>;

    nextGameID(overrides?: CallOverrides): Promise<BigNumber>;

    nextSessionID(overrides?: CallOverrides): Promise<BigNumber>;

    registerGame(
      config_: Vapor.GameConfigStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    sessions(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, string, string, number, string] & {
        gameID: BigNumber;
        sessionID: BigNumber;
        joinableIndex: BigNumber;
        name: string;
        creator: string;
        status: number;
        initialSettings: string;
      }
    >;

    startSession(
      sessionID: BigNumberish,
      players: string[],
      startSettings: BytesLike,
      playerSettings: BytesLike[],
      overrides?: CallOverrides
    ): Promise<void>;

    validateEnumValue(
      allowedValues: string[],
      value: string,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "GameCreated(uint256,uint256)"(
      gameID?: BigNumberish | null,
      sessionID?: null
    ): GameCreatedEventFilter;
    GameCreated(
      gameID?: BigNumberish | null,
      sessionID?: null
    ): GameCreatedEventFilter;

    "GameRegistered(uint256)"(gameID?: null): GameRegisteredEventFilter;
    GameRegistered(gameID?: null): GameRegisteredEventFilter;

    "GameStarted(uint256,uint256)"(
      gameID?: BigNumberish | null,
      sessionID?: BigNumberish | null
    ): GameStartedEventFilter;
    GameStarted(
      gameID?: BigNumberish | null,
      sessionID?: BigNumberish | null
    ): GameStartedEventFilter;
  };

  estimateGas: {
    completeSession(
      sessionID: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    createSession(
      gameID: BigNumberish,
      name: string,
      initialSettings: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    gameConfigs(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getInitialSettingsManifest(
      gameID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getJoinableSessions(overrides?: CallOverrides): Promise<BigNumber>;

    getPlayerSettingsManifest(
      gameID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getStartSettingsManifest(
      gameID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nextGameID(overrides?: CallOverrides): Promise<BigNumber>;

    nextSessionID(overrides?: CallOverrides): Promise<BigNumber>;

    registerGame(
      config_: Vapor.GameConfigStruct,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    sessions(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    startSession(
      sessionID: BigNumberish,
      players: string[],
      startSettings: BytesLike,
      playerSettings: BytesLike[],
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    validateEnumValue(
      allowedValues: string[],
      value: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    completeSession(
      sessionID: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    createSession(
      gameID: BigNumberish,
      name: string,
      initialSettings: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    gameConfigs(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getInitialSettingsManifest(
      gameID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getJoinableSessions(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPlayerSettingsManifest(
      gameID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getStartSettingsManifest(
      gameID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nextGameID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nextSessionID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    registerGame(
      config_: Vapor.GameConfigStruct,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    sessions(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    startSession(
      sessionID: BigNumberish,
      players: string[],
      startSettings: BytesLike,
      playerSettings: BytesLike[],
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    validateEnumValue(
      allowedValues: string[],
      value: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
