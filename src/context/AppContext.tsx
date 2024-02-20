import React, { Dispatch, useEffect, useState } from "react";
import { JPChar, Charset } from "../models/charsets.model";
import { useSelectCharset } from "../hooks";

type Context = {
  charSet: JPChar[] | null;
  setCharsetName: Dispatch<Charset>;
};

const appCTX = React.createContext({} as Context);

const useAppContext = () => {
  return React.useContext(appCTX);
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {

  const [charsetName, setCharsetName] = useState<Charset>(Charset.HIRAGANA);

  const { charSet } = useSelectCharset(charsetName);

  console.log(charSet)

  return (
    <appCTX.Provider value={{ charSet: charSet, setCharsetName }}>
      {children}
    </appCTX.Provider>
  );
};

export { AppProvider, useAppContext };
