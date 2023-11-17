import React, { createContext, Dispatch, useContext, useReducer } from 'react';

import { StoreActions, StoreState } from '@type/store';

import reducer, { initialState } from './reducer';

type StoreContextProps = {
  store: StoreState;
  dispatch: Dispatch<StoreActions>;
};

const defaultContext: StoreContextProps = {
  store: initialState,
  dispatch: () => null,
};

export const StoreContext = createContext<StoreContextProps>(defaultContext);

export const StoreProvider: React.FC = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextProps => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
