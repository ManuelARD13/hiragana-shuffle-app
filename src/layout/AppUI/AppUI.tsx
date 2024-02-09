import React, { useState, useEffect, useReducer } from "react";

import { JPChar, ActionTypes, Screen } from "../../models/charsets.model";

import charSets from "../../data.json";

import MainImage from "../../components/MainImage/MainImage";
import StartModal from "../../components/StartModal/StartModal";
import PermissionsModal from "../../components/PermissionsModal/PermissionsModal";
import GameOverModal from "../../components/GameOverModal/GameOverModal";
import InputLayout from "../InputLayout/InputLayout";
import ModeSelector from "../../components/ModeSelector/ModeSelector";

function AppUI() {
  const [char, setChar] = useState<JPChar>({
    character: "",
    romaji: "",
  });

  const [screen, setScreen] = useState<Screen>(Screen.permissions);
  const [isAudioAllowed, setIsAudioAllowed] = useState<boolean>(true);

  //Charsets
  const hiragana: JPChar[] | undefined = charSets.hiragana.base;
  const katakana: JPChar[] | undefined = charSets.katakana.base;
  const hiraganaSpecial: JPChar[] | undefined = charSets.hiragana.special;
  const katakanaSpecial: JPChar[] | undefined = charSets.katakana.special;
  const hiraganaYou_on: JPChar[] | undefined = charSets.you_on.hiragana;
  const katakanaYou_on: JPChar[] | undefined = charSets.you_on.katakana;
  const hiraganaWords: JPChar[] | undefined = charSets.words.hiragana;
  const katakanaWords: JPChar[] | undefined = charSets.words.katakana;

  const [gameCharset, setGameCharset] = useState<JPChar[] | undefined>(
    undefined
  );
  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  const chartsetReducer = (state: JPChar[], action: ActionTypes) => {
    switch (action) {
      default:
        return hiragana;

      case "SET_KATAKANA":
        return katakana;

      case "SET_HIRAGANA_AND_KATAKANA":
        return [...hiragana, ...katakana];

      case "SET_HIRAGANA_2":
        return [...hiragana, ...hiraganaSpecial];

      case "SET_KATAKANA_2":
        return [...katakana, ...katakanaSpecial];

      case "SET_HIRAGANA_AND_KATAKANA_FULL":
        return [
          ...hiragana,
          ...katakana,
          ...hiraganaSpecial,
          ...katakanaSpecial,
        ];

      case "SET_HIRAGANA_WORDS":
        return hiraganaWords;

      case "SET_KATAKANA_WORDS":
        return katakanaWords;

      case "SET_HIRAGANA_SPECIAL":
        return hiraganaYou_on;

      case "SET_KATAKANA_SPECIAL":
        return katakanaYou_on;
    }
  };

  const [charSet, dispatch] = useReducer(chartsetReducer, hiragana);

  const randomChar = (charset: JPChar[]): void => {
    if (charset.length > 0) {
      const randomChar = charset[Math.floor(Math.random() * charset.length)];
      setChar(randomChar);
    } else {
      setChar({ character: "", romaji: "" });
    }
  };

  const updateGameCharset = (): void => {
    if (gameCharset) {
      if (gameCharset.length >= 1) {
        const newCharset = gameCharset?.filter(
          (character) => char.romaji !== character.romaji
        );
        setGameCharset(newCharset);
   
        if (newCharset.length === 0) {
          setIsGameRunning(false);
          setIsGameOver(true);
        }
      }
    }
  };

  useEffect(() => {
    if(gameCharset){randomChar(gameCharset);}
  }, [gameCharset])

  // useEffect(() => {
  //   if (gameCharset) {
  //     randomChar(gameCharset);
  //   } else {
  //     randomChar(charSet);
  //   }
  // }, []);

  useEffect(() => {
    const backgroundImages = [
      require("../../img/temple-day-bk.jpg").default,
      require("../../img/night-jp-bk.jpg").default,
      require("../../img/school-day-bk.jpg").default,
      require("../../img/street-day-bk.jpg").default,
    ];
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    setBackgroundImage(backgroundImages[randomIndex]);
  }, []);

  return (
    <>
      {screen === Screen.permissions ? (
        <PermissionsModal
          buttonCallback={() => setScreen(Screen.intro)}
          setAudioAllowed={setIsAudioAllowed}
        />
      ) : null}
      {screen === Screen.intro ? (
        <StartModal setScreen={setScreen} isAudioAllowed={isAudioAllowed} />
      ) : null}
      {screen === Screen.modeSelector ? (
        <ModeSelector
          dispatch={dispatch}
          buttonCallback={setScreen}
          setIsGameRunning={setIsGameRunning}
          setGameCharset={() => setGameCharset(charSet)}
        />
      ) : null}

      {isGameRunning ? (
        <main
          className="main"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="overlay"></div>
          <div className="main__header">
            <div className="logo-icon">
              <p>大</p>
            </div>
            <div className="main__header-title">
              <h1>Game Mode Title</h1>
            </div>
          </div>
          <MainImage char={char.character} />
          <InputLayout
            char={char}
            updateGameCharset={updateGameCharset}
            isGameRunning={isGameRunning}
          />
        </main>
      ) : null}
      {isGameOver ? <GameOverModal /> : null}
    </>
  );
}

export default AppUI;
