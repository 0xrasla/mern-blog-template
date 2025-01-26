import { createContext, useContext } from "react";

const GlobalContext = createContext({
  user: null,
  setUser: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalContext;
