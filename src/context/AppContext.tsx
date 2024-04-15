//React
import React, { Dispatch, useContext, useReducer, useState } from "react";
//Hooks
import { useGameData } from "../hooks";
//Types
import {
  Charset,
  Screen,
  GameModes,
  GameReducerTypes,
  GameAction,
  type JPChar,
  type GameCharset,
  type GameState
} from "models/charsets.model";


type Context = {
  charSet: JPChar[] | null;
  charsetName: Charset;
  setCharsetName: Dispatch<Charset>;
  isLoading: boolean;
  gameLogic: GameCharset;
  gameState: GameState;
  gameDispatch: Dispatch<GameReducerTypes>;
};

const appCTX = React.createContext({} as Context);

const useAppContext = () => {
  return useContext(appCTX);
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [charsetName, setCharsetName] = useState<Charset>(Charset.HIRAGANA);
  const { charSet, isLoading, gameLogic } = useGameData(charsetName);

  const gameReducer = (state: GameState, action: GameReducerTypes) => {
    switch (action.type) {
      case GameAction.SET_GAME_MODE:
        if(action.payload === GameModes.study){
          return {
            ...state,
            gameMode: action.payload
          }
        }
        return {
          ...state,
          gameMode: action.payload,
        };
      case GameAction.SET_MAYOR_CHARSET:
        return {
          ...state,
          mayorCharset: action.payload,
        };
      case GameAction.SET_SCREEN:
        return {
          ...state,
          screen: action.payload,
        };
      case GameAction.SET_IS_GAME_LOADING:
        return {
          ...state,
          isGameLoading: action.payload
        };
      case GameAction.SET_IS_GAME_RUNNING:
        return {
          ...state,
          isGameRunning: action.payload,
        };
      case GameAction.SET_IS_GAME_OVER:
        return {
          ...state,
          isGameOver: action.payload,
        };
      case GameAction.SET_IS_AUDIO_ALLOWED:
        return {
          ...state,
          isAudioAllowed: action.payload,
        };
      case GameAction.SET_TIME_ATTACK_DIFFICULTY:
        return {
          ...state,
          timeAttackDifficulty: action.payload
        }
      default:
        throw new Error("Invalid action type");
    }
  };

  const [gameState, gameDispatch] = useReducer(gameReducer, {
    gameMode: GameModes.study,
    mayorCharset: Charset.HIRAGANA,
    screen: Screen.permissions,
    isGameRunning: false,
    isGameOver: false,
    isGameLoading: false,
    isAudioAllowed: false,
    timeAttackDifficulty: 1
  });

  return (
    <appCTX.Provider
      value={{
        charsetName,
        setCharsetName,
        //Hook Data
        charSet,
        isLoading,
        gameLogic,
        //Global state
        gameState,
        gameDispatch,
      }}
    >
      {children}
    </appCTX.Provider>
  );
};

export { AppProvider, useAppContext };
