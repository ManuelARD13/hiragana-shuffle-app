//React
import React from "react";
//Hooks
import { useAppContext } from "context/AppContext";
//Types
import { Charset, GameAction, Screen, Mode } from "models/charsets.model";
//components
import SelectorsList from "common/SelectorList/SelectorList";


const hiraganaModes: Mode[] = [
  {
    name: "Basic Set",
    id: "HIRAGANA",
    isLocked: false,
  },
  {
    name: "Ten-Ten & Maru",
    id: "HIRAGANA_TENTEN_MARU",
    isLocked: false,
  },
  {
    name: "Full Set!",
    id: "HIRAGANA_FULLSET",
    isLocked: false,
  },
  {
    name: "You-On",
    id: "HIRAGANA_YOUON",
    isLocked: false,
  },
  {
    name: "Chiisai",
    id: "HIRAGANA_CHIISAI",
    isLocked: false,
  },
  {
    name: "Japanese Words",
    id: "HIRAGANA_WORDS",
    isLocked: true,
  },
];
const katakanaModes: Mode[] = [
  {
    name: "Basic Set",
    id: "KATAKANA",
    isLocked: false,
  },
  {
    name: "Ten-Ten & Maru",
    id: "KATAKANA_TENTEN_MARU",
    isLocked: false,
  },
  {
    name: "Full Set!",
    id: "KATAKANA_FULLSET",
    isLocked: false,
  },
  {
    name: "You-On",
    id: "KATAKANA_YOUON",
    isLocked: false,
  },
  {
    name: "Chiisai",
    id: "KATAKANA_CHIISAI",
    isLocked: false,
  },
  {
    name: "Japanese Words",
    id: "KATAKANA_WORDS",
    isLocked: true,
  },
];
const hiraganaAndKatakanaModes: Mode[] = [
  {
    name: "Basic Set",
    id: "HIRAGANA_KATAKANA",
    isLocked: false,
  },
  {
    name: "Ten-Ten & Maru",
    id: "HIRAGANA_KATAKANA_TENTEN_MARU",
    isLocked: false,
  },
  {
    name: "Full Set!",
    id: "HIRAGANA_KATAKANA_FULLSET",
    isLocked: false,
  },
  {
    name: "You-On",
    id: "HIRAGANA_KATAKANA_YOUON",
    isLocked: false,
  },
  {
    name: "Chiisai",
    id: "HIRAGANA_KATAKANA_CHIISAI",
    isLocked: false,
  },
  {
    name: "Japanese Words",
    id: "HIRAGANA_KATAKANA_WORDS",
    isLocked: true,
  },
];

function CharsetSelector() {
  const { gameDispatch, gameState, setCharsetName } = useAppContext();

  const selectList = (mayorCharset: string): Mode[] => {
    switch (mayorCharset) {
      case "HIRAGANA":
        return hiraganaModes;
      case "KATAKANA":
        return katakanaModes;
      default:
        return hiraganaAndKatakanaModes;
    }}

  const handleClose = () => {
    gameDispatch({
      type: GameAction.SET_SCREEN,
      payload: Screen.start,
    });
    gameDispatch({
      type: GameAction.SET_IS_GAME_RUNNING,
      payload: true,
    });
  };

  return (
    <SelectorsList
      title="Choose A Level Of Challenge!"
      selectorList={selectList(gameState.mayorCharset)}
      onCloseCallback={handleClose}
      checkboxHandler={(id: string) => {
        setCharsetName(Charset[id as keyof typeof Charset]);
      }}
    />
  );
}

export default CharsetSelector;
