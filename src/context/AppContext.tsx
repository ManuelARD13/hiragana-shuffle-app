import React, { Dispatch, useEffect, useState } from "react";
import { JPChar, Charset, GameCharset } from "../models/charsets.model";
import { useGameData } from "../hooks";

type Context = {
  charSet: JPChar[] | null;
  setCharsetName: Dispatch<Charset>;
  isLoading: boolean;
  gameLogic: GameCharset;
};

const appCTX = React.createContext({} as Context);

const useAppContext = () => {
  return React.useContext(appCTX);
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {

  const [charsetName, setCharsetName] = useState<Charset>(Charset.HIRAGANA);

  const { charSet, isLoading, gameLogic } = useGameData(charsetName);



  return (
    <appCTX.Provider value={{ charSet: charSet, setCharsetName, isLoading, gameLogic }}>
      {children}
    </appCTX.Provider>
  );
};

export { AppProvider, useAppContext };
