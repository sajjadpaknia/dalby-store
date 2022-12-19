import React, { useContext } from "react";
import { useReducer } from "react";
import { initState, reducer } from "./Reducer";

const AppState = React.createContext();
const AppDispatcher = React.createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <AppState.Provider value={state}>
      <AppDispatcher.Provider value={dispatch}>
        {children}
      </AppDispatcher.Provider>
    </AppState.Provider>
  );
};
export const useGlobalState = () => {
  return useContext(AppState);
};
export const useGlobalDispatch = () => {
  return useContext(AppDispatcher);
};
