import {
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractRead,
  UseContractReadConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import {
  WriteContractMode,
  PrepareWriteContractResult,
  ReadContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DemoGame
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const demoGameABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'vapor', internalType: 'contract Vapor', type: 'address' },
    ],
    name: 'init',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sessionID', internalType: 'uint256', type: 'uint256' },
      { name: 'initialSettings', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'receiveInitialSettings',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sessionID', internalType: 'uint256', type: 'uint256' },
      { name: 'players', internalType: 'address[]', type: 'address[]' },
      { name: 'startSettings', internalType: 'bytes', type: 'bytes' },
      { name: 'playerSettings', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'startGame',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Vapor
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const vaporABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  { type: 'error', inputs: [], name: 'WrongAuthority' },
  { type: 'error', inputs: [], name: 'WrongCreator' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'gameID',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'sessionID',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'GameCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'gameID',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'GameRegistered',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'gameID',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'sessionID',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'GameStarted',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'sessionID', internalType: 'uint256', type: 'uint256' }],
    name: 'completeSession',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'gameID', internalType: 'uint256', type: 'uint256' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'initialSettings', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'createSession',
    outputs: [{ name: 'sessionID', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'gameConfigs',
    outputs: [
      { name: 'gameID', internalType: 'uint256', type: 'uint256' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'authority', internalType: 'address', type: 'address' },
      {
        name: 'sendInitialSettings',
        internalType: 'function (uint256,bytes) external',
        type: 'function',
      },
      {
        name: 'startCallback',
        internalType: 'function (uint256,address[],bytes,bytes[]) external',
        type: 'function',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getJoinableSessions',
    outputs: [
      {
        name: '',
        internalType: 'struct Vapor.Session[]',
        type: 'tuple[]',
        components: [
          { name: 'gameID', internalType: 'uint256', type: 'uint256' },
          { name: 'sessionID', internalType: 'uint256', type: 'uint256' },
          { name: 'joinableIndex', internalType: 'uint256', type: 'uint256' },
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'creator', internalType: 'address', type: 'address' },
          {
            name: 'status',
            internalType: 'enum Vapor.GameStatus',
            type: 'uint8',
          },
          { name: 'initialSettings', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'nextGameID',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'nextSessionID',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'config_',
        internalType: 'struct Vapor.GameConfig',
        type: 'tuple',
        components: [
          { name: 'gameID', internalType: 'uint256', type: 'uint256' },
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'authority', internalType: 'address', type: 'address' },
          {
            name: 'initialSettingsManifest',
            internalType: 'struct Vapor.SettingDeclaration[]',
            type: 'tuple[]',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              {
                name: 'valueType',
                internalType: 'enum Vapor.ValueType',
                type: 'uint8',
              },
              {
                name: 'allowedValues',
                internalType: 'string[]',
                type: 'string[]',
              },
            ],
          },
          {
            name: 'startSettingsManifest',
            internalType: 'struct Vapor.SettingDeclaration[]',
            type: 'tuple[]',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              {
                name: 'valueType',
                internalType: 'enum Vapor.ValueType',
                type: 'uint8',
              },
              {
                name: 'allowedValues',
                internalType: 'string[]',
                type: 'string[]',
              },
            ],
          },
          {
            name: 'playerSettingsManifest',
            internalType: 'struct Vapor.SettingDeclaration[]',
            type: 'tuple[]',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              {
                name: 'valueType',
                internalType: 'enum Vapor.ValueType',
                type: 'uint8',
              },
              {
                name: 'allowedValues',
                internalType: 'string[]',
                type: 'string[]',
              },
            ],
          },
          {
            name: 'sendInitialSettings',
            internalType: 'function (uint256,bytes) external',
            type: 'function',
          },
          {
            name: 'startCallback',
            internalType: 'function (uint256,address[],bytes,bytes[]) external',
            type: 'function',
          },
        ],
      },
    ],
    name: 'registerGame',
    outputs: [{ name: 'gameID', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'sessions',
    outputs: [
      { name: 'gameID', internalType: 'uint256', type: 'uint256' },
      { name: 'sessionID', internalType: 'uint256', type: 'uint256' },
      { name: 'joinableIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'creator', internalType: 'address', type: 'address' },
      { name: 'status', internalType: 'enum Vapor.GameStatus', type: 'uint8' },
      { name: 'initialSettings', internalType: 'bytes', type: 'bytes' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sessionID', internalType: 'uint256', type: 'uint256' },
      { name: 'players', internalType: 'address[]', type: 'address[]' },
      { name: 'startSettings', internalType: 'bytes', type: 'bytes' },
      { name: 'playerSettings', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'startSession',
    outputs: [],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: 'allowedValues', internalType: 'string[]', type: 'string[]' },
      { name: 'value', internalType: 'string', type: 'string' },
    ],
    name: 'validateEnumValue',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link demoGameABI}__.
 */
export function useDemoGameWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof demoGameABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof demoGameABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof demoGameABI, TFunctionName, TMode>({
    abi: demoGameABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link demoGameABI}__ and `functionName` set to `"init"`.
 */
export function useDemoGameInit<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof demoGameABI,
          'init'
        >['request']['abi'],
        'init',
        TMode
      > & { functionName?: 'init' }
    : UseContractWriteConfig<typeof demoGameABI, 'init', TMode> & {
        abi?: never
        functionName?: 'init'
      } = {} as any,
) {
  return useContractWrite<typeof demoGameABI, 'init', TMode>({
    abi: demoGameABI,
    functionName: 'init',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link demoGameABI}__ and `functionName` set to `"receiveInitialSettings"`.
 */
export function useDemoGameReceiveInitialSettings<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof demoGameABI,
          'receiveInitialSettings'
        >['request']['abi'],
        'receiveInitialSettings',
        TMode
      > & { functionName?: 'receiveInitialSettings' }
    : UseContractWriteConfig<
        typeof demoGameABI,
        'receiveInitialSettings',
        TMode
      > & {
        abi?: never
        functionName?: 'receiveInitialSettings'
      } = {} as any,
) {
  return useContractWrite<typeof demoGameABI, 'receiveInitialSettings', TMode>({
    abi: demoGameABI,
    functionName: 'receiveInitialSettings',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link demoGameABI}__ and `functionName` set to `"startGame"`.
 */
export function useDemoGameStartGame<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof demoGameABI,
          'startGame'
        >['request']['abi'],
        'startGame',
        TMode
      > & { functionName?: 'startGame' }
    : UseContractWriteConfig<typeof demoGameABI, 'startGame', TMode> & {
        abi?: never
        functionName?: 'startGame'
      } = {} as any,
) {
  return useContractWrite<typeof demoGameABI, 'startGame', TMode>({
    abi: demoGameABI,
    functionName: 'startGame',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link demoGameABI}__.
 */
export function usePrepareDemoGameWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof demoGameABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: demoGameABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof demoGameABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link demoGameABI}__ and `functionName` set to `"init"`.
 */
export function usePrepareDemoGameInit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof demoGameABI, 'init'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: demoGameABI,
    functionName: 'init',
    ...config,
  } as UsePrepareContractWriteConfig<typeof demoGameABI, 'init'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link demoGameABI}__ and `functionName` set to `"receiveInitialSettings"`.
 */
export function usePrepareDemoGameReceiveInitialSettings(
  config: Omit<
    UsePrepareContractWriteConfig<typeof demoGameABI, 'receiveInitialSettings'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: demoGameABI,
    functionName: 'receiveInitialSettings',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof demoGameABI,
    'receiveInitialSettings'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link demoGameABI}__ and `functionName` set to `"startGame"`.
 */
export function usePrepareDemoGameStartGame(
  config: Omit<
    UsePrepareContractWriteConfig<typeof demoGameABI, 'startGame'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: demoGameABI,
    functionName: 'startGame',
    ...config,
  } as UsePrepareContractWriteConfig<typeof demoGameABI, 'startGame'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vaporABI}__.
 */
export function useVaporRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof vaporABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vaporABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: vaporABI, ...config } as UseContractReadConfig<
    typeof vaporABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vaporABI}__ and `functionName` set to `"gameConfigs"`.
 */
export function useVaporGameConfigs<
  TFunctionName extends 'gameConfigs',
  TSelectData = ReadContractResult<typeof vaporABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vaporABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: vaporABI,
    functionName: 'gameConfigs',
    ...config,
  } as UseContractReadConfig<typeof vaporABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vaporABI}__ and `functionName` set to `"getJoinableSessions"`.
 */
export function useVaporGetJoinableSessions<
  TFunctionName extends 'getJoinableSessions',
  TSelectData = ReadContractResult<typeof vaporABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vaporABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: vaporABI,
    functionName: 'getJoinableSessions',
    ...config,
  } as UseContractReadConfig<typeof vaporABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vaporABI}__ and `functionName` set to `"nextGameID"`.
 */
export function useVaporNextGameId<
  TFunctionName extends 'nextGameID',
  TSelectData = ReadContractResult<typeof vaporABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vaporABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: vaporABI,
    functionName: 'nextGameID',
    ...config,
  } as UseContractReadConfig<typeof vaporABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vaporABI}__ and `functionName` set to `"nextSessionID"`.
 */
export function useVaporNextSessionId<
  TFunctionName extends 'nextSessionID',
  TSelectData = ReadContractResult<typeof vaporABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vaporABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: vaporABI,
    functionName: 'nextSessionID',
    ...config,
  } as UseContractReadConfig<typeof vaporABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vaporABI}__ and `functionName` set to `"sessions"`.
 */
export function useVaporSessions<
  TFunctionName extends 'sessions',
  TSelectData = ReadContractResult<typeof vaporABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vaporABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: vaporABI,
    functionName: 'sessions',
    ...config,
  } as UseContractReadConfig<typeof vaporABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vaporABI}__ and `functionName` set to `"validateEnumValue"`.
 */
export function useVaporValidateEnumValue<
  TFunctionName extends 'validateEnumValue',
  TSelectData = ReadContractResult<typeof vaporABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vaporABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: vaporABI,
    functionName: 'validateEnumValue',
    ...config,
  } as UseContractReadConfig<typeof vaporABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vaporABI}__.
 */
export function useVaporWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof vaporABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof vaporABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof vaporABI, TFunctionName, TMode>({
    abi: vaporABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vaporABI}__ and `functionName` set to `"completeSession"`.
 */
export function useVaporCompleteSession<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vaporABI,
          'completeSession'
        >['request']['abi'],
        'completeSession',
        TMode
      > & { functionName?: 'completeSession' }
    : UseContractWriteConfig<typeof vaporABI, 'completeSession', TMode> & {
        abi?: never
        functionName?: 'completeSession'
      } = {} as any,
) {
  return useContractWrite<typeof vaporABI, 'completeSession', TMode>({
    abi: vaporABI,
    functionName: 'completeSession',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vaporABI}__ and `functionName` set to `"createSession"`.
 */
export function useVaporCreateSession<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vaporABI,
          'createSession'
        >['request']['abi'],
        'createSession',
        TMode
      > & { functionName?: 'createSession' }
    : UseContractWriteConfig<typeof vaporABI, 'createSession', TMode> & {
        abi?: never
        functionName?: 'createSession'
      } = {} as any,
) {
  return useContractWrite<typeof vaporABI, 'createSession', TMode>({
    abi: vaporABI,
    functionName: 'createSession',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vaporABI}__ and `functionName` set to `"registerGame"`.
 */
export function useVaporRegisterGame<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vaporABI,
          'registerGame'
        >['request']['abi'],
        'registerGame',
        TMode
      > & { functionName?: 'registerGame' }
    : UseContractWriteConfig<typeof vaporABI, 'registerGame', TMode> & {
        abi?: never
        functionName?: 'registerGame'
      } = {} as any,
) {
  return useContractWrite<typeof vaporABI, 'registerGame', TMode>({
    abi: vaporABI,
    functionName: 'registerGame',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vaporABI}__ and `functionName` set to `"startSession"`.
 */
export function useVaporStartSession<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vaporABI,
          'startSession'
        >['request']['abi'],
        'startSession',
        TMode
      > & { functionName?: 'startSession' }
    : UseContractWriteConfig<typeof vaporABI, 'startSession', TMode> & {
        abi?: never
        functionName?: 'startSession'
      } = {} as any,
) {
  return useContractWrite<typeof vaporABI, 'startSession', TMode>({
    abi: vaporABI,
    functionName: 'startSession',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vaporABI}__.
 */
export function usePrepareVaporWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vaporABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: vaporABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof vaporABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vaporABI}__ and `functionName` set to `"completeSession"`.
 */
export function usePrepareVaporCompleteSession(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vaporABI, 'completeSession'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: vaporABI,
    functionName: 'completeSession',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vaporABI, 'completeSession'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vaporABI}__ and `functionName` set to `"createSession"`.
 */
export function usePrepareVaporCreateSession(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vaporABI, 'createSession'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: vaporABI,
    functionName: 'createSession',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vaporABI, 'createSession'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vaporABI}__ and `functionName` set to `"registerGame"`.
 */
export function usePrepareVaporRegisterGame(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vaporABI, 'registerGame'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: vaporABI,
    functionName: 'registerGame',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vaporABI, 'registerGame'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vaporABI}__ and `functionName` set to `"startSession"`.
 */
export function usePrepareVaporStartSession(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vaporABI, 'startSession'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: vaporABI,
    functionName: 'startSession',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vaporABI, 'startSession'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link vaporABI}__.
 */
export function useVaporEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof vaporABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: vaporABI,
    ...config,
  } as UseContractEventConfig<typeof vaporABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link vaporABI}__ and `eventName` set to `"GameCreated"`.
 */
export function useVaporGameCreatedEvent(
  config: Omit<
    UseContractEventConfig<typeof vaporABI, 'GameCreated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: vaporABI,
    eventName: 'GameCreated',
    ...config,
  } as UseContractEventConfig<typeof vaporABI, 'GameCreated'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link vaporABI}__ and `eventName` set to `"GameRegistered"`.
 */
export function useVaporGameRegisteredEvent(
  config: Omit<
    UseContractEventConfig<typeof vaporABI, 'GameRegistered'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: vaporABI,
    eventName: 'GameRegistered',
    ...config,
  } as UseContractEventConfig<typeof vaporABI, 'GameRegistered'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link vaporABI}__ and `eventName` set to `"GameStarted"`.
 */
export function useVaporGameStartedEvent(
  config: Omit<
    UseContractEventConfig<typeof vaporABI, 'GameStarted'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: vaporABI,
    eventName: 'GameStarted',
    ...config,
  } as UseContractEventConfig<typeof vaporABI, 'GameStarted'>)
}
