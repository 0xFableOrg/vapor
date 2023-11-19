import { StoreActions, StoreActionTypes, StoreState } from '@type/store';

export const initialState: StoreState = {
  provider: undefined,
  account: undefined,
  balance: '0',
  wakuNode: undefined
};

const reducer = (state: StoreState, action: StoreActions) => {
  switch (action.type) {
    case StoreActionTypes.SET_ACCOUNT:
      return {
        ...state,
        account: action.payload.account,
      };
    case StoreActionTypes.SET_PROVIDER:
      return {
        ...state,
        provider: action.payload.provider,
      };
    case StoreActionTypes.SET_BALANCE:
      return {
        ...state,
        balance: action.payload.balance,
      };
    case StoreActionTypes.CLEAR_STATE:
      return initialState;
    case StoreActionTypes.SET_WAKU_NODE:
      return {
        ...state,
        wakuNode: action.payload.wakuNode,
      };
    default:
      return state;
  }
};

export default reducer;
