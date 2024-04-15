//React
import React from "react";
//Hooks
import { useAppContext } from "context/AppContext";
//Types
import { Charset, GameAction, Screen, Mode, GameModes } from "models/charsets.model";
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

const studyModeCharsets: Mode[] = [
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
    name: "Kanji",
    id: "KANJI",
    isLocked: true,
  },
]

function MayorCharsetSelector({ screen }: { screen: Screen }) {
  const { gameDispatch, gameState } = useAppContext();

  const handleClose = () => {
    gameDispatch({
      type: GameAction.SET_SCREEN,
      payload: screen,
    });
  };

  return (
    <>
    <SelectorsList
      title="Which Character Set Do We Wanna Play Today?"
      selectorList={gameState.gameMode === GameModes.study ? studyModeCharsets : mayorCharsets}
      onCloseCallback={handleClose}
      checkboxHandler={(id: string) => {
        gameDispatch({
          type: GameAction.SET_MAYOR_CHARSET,
          payload: Charset[id as keyof typeof Charset],
        });
      }}
      returnButtonCallback={() => {
        gameDispatch({
          type: GameAction.SET_SCREEN,
          payload: Screen.modeSelector,
        })
      }}
    />
    </>
  );
}

export default MayorCharsetSelector;