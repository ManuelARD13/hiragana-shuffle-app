import React, { Dispatch, useEffect, useState } from "react";
import { JPChar, Charset, GameCharset, GameMode } from "../models/charsets.model";
import { useGameData } from "../hooks";

type Context = {
  charSet: JPChar[] | null;
  setCharsetName: Dispatch<Charset>;
  isLoading: boolean;
  gameLogic: GameCharset;
  setGameMode: Dispatch<GameMode>;
};

const appCTX = React.createContext({} as Context);

const useAppContext = () => {
  return React.useContext(appCTX);
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {

  const [charsetName, setCharsetName] = useState<Charset>(Charset.HIRAGANA);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.practice);

  const { charSet, isLoading, gameLogic } = useGameData(charsetName);



  return (
    <appCTX.Provider value={{ charSet: charSet, setCharsetName, isLoading, gameLogic, setGameMode }}>
      {children}
    </appCTX.Provider>
  );
};

export { AppProvider, useAppContext };
