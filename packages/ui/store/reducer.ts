import { StoreActions, StoreActionTypes, StoreState } from "@type/store"

export const initialState: StoreState = {
  provider: undefined,
  account: undefined,
  balance: "0",
  wakuNode: undefined,
  rooms: [],
  vaporInstance: undefined,
};

const reducer = (state: StoreState, action: StoreActions) => {
  switch (action.type) {
    case StoreActionTypes.SET_ACCOUNT:
      return {
        ...state,
        account: action.payload.account,
      }
    case StoreActionTypes.SET_PROVIDER:
      return {
        ...state,
        provider: action.payload.provider,
      }
    case StoreActionTypes.SET_BALANCE:
      return {
        ...state,
        balance: action.payload.balance,
      }
    case StoreActionTypes.CLEAR_STATE:
      return initialState
    case StoreActionTypes.SET_WAKU_NODE:
      return {
        ...state,
        wakuNode: action.payload.wakuNode,
      }
    case StoreActionTypes.SET_ALL_ROOMS:
      return {
        ...state,
        rooms: action.payload.rooms,
      }
    case StoreActionTypes.ADD_ROOM:
      return { ...state, rooms: [...(state.rooms || []), action.payload.room] }
    case StoreActionTypes.SET_ROOM:
      return {
        ...state,
        rooms: state.rooms?.map((room) =>
          room.gameID === action.payload.room.gameID
            ? action.payload.room
            : room
        ),
      }
    case StoreActionTypes.REMOVE_ROOM:
      return {
        ...state,
        rooms: state.rooms?.filter(
          (room) => room.gameID !== action.payload.room.gameID
        ),
      }
    case StoreActionTypes.SET_VAPOR_INSTANCE:
      return {
        ...state,
        wakuNode: action.payload.vaporInstance,
      };
    default:
      return state
  }
}

export default reducer
