//React
import React from "react";
//Hooks
import { useAppContext } from "context/AppContext";
//Types
import { Charset, GameAction, Screen, Mode } from "models/charsets.model";
//components
import SelectorsList from "common/SelectorList/SelectorList";

const mayorCharsets: Mode[] = [
  {
    name: "Hiragana",
    id: "HIRAGANA",
    isLocked: false,
  },
  {
    name: "Katakana",
    id: "KATAKANA",
    isLocked: false,
  },
  {
    name: "Hiragana & Katakana",
    id: "HIRAGANA_KATAKANA",
    isLocked: false,
  },
  {
    name: "Kanji",
    id: "KANJI",
    isLocked: true,
  },
];

function MayorCharsetSelector() {
  const { gameDispatch } = useAppContext();

  const handleClose = () => {
    gameDispatch({
      type: GameAction.SET_SCREEN,
      payload: Screen.charsetSelector,
    });
  };

  return (
    <SelectorsList
      title="Which Character Set Do We Wanna Play Today?"
      selectorList={mayorCharsets}
      onCloseCallback={handleClose}
      checkboxHandler={(id: string) => {
        gameDispatch({
          type: GameAction.SET_MAYOR_CHARSET,
          payload: Charset[id as keyof typeof Charset],
        });
      }}
    />
  );
}

export default MayorCharsetSelector;