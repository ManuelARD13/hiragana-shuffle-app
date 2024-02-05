import React, { useState, useEffect, useReducer } from "react";

import { JPChar, ActionTypes } from "../../models/charsets.model";

import charSets from "../../data.json";

import MainImage from "../../components/MainImage/MainImage";
import Input from "../../components/Input/Input";
import Scores from "../../components/Scores/Scores";
import StartModal from "../../components/StartModal/StartModal";

function Main() {
  const [char, setChar] = useState<JPChar>({
    character: "",
    romaji: "",
  });

  //Charsets
  const hiragana: JPChar[] | undefined = charSets.hiragana.base;
  const katakana: JPChar[] | undefined = charSets.katakana.base;
  const hiraganaSpecial: JPChar[] | undefined = charSets.hiragana.special;
  const katakanaSpecial: JPChar[] | undefined = charSets.katakana.special;
  const hiraganaYou_on: JPChar[] | undefined = charSets.you_on.hiragana;
  const katakanaYou_on: JPChar[] | undefined = charSets.you_on.katakana;
  const hiraganaWords: JPChar[] | undefined = charSets.words.hiragana;
  const katakanaWords: JPChar[] | undefined = charSets.words.katakana;

  const [score, setScore] = useState<number>(0);
  const [gameCharset, setGameCharset] = useState<JPChar[] | undefined>(
    hiragana
  );
  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);

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

  const updateGameCharset = (): void => {
    if (gameCharset) {
      if (gameCharset?.length > 0) {
        const newCharset = gameCharset?.filter(
          (character) => char.romaji !== character.romaji
        );
        setGameCharset(newCharset);
      } else {
        setIsGameRunning(false);
        alert("Game over");
        window.location.reload();
      }
    }
  };

  const randomChar = (charset: JPChar[]): void => {
    if (charset.length > 0) {
      const randomChar = charset[Math.floor(Math.random() * charset.length)];
      setChar(randomChar);
    } else {
      setChar({ character: "", romaji: "" });
    }
  };

  useEffect(() => {
    updateGameCharset();
  }, [gameCharset]);

  useEffect(() => {
    if (gameCharset) {
      randomChar(gameCharset);
    }
  }, [score, isGameRunning]);

  useEffect(() => {
    setGameCharset(charSet);
  }, [charSet]);

  const validateAnswer = (input: string): boolean => {
    if (char.romaji === input) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <StartModal setIsGameRunning={setIsGameRunning} />
      <main>
        <h1>Higarana Shuffle</h1>
        <MainImage char={char.character} />
        <Input
          validateAnswer={validateAnswer}
          setScore={setScore}
          score={score}
        />
        <Scores score={score} level={1} isGameRunning={isGameRunning} />
      </main>
    </>
  );
}

export default Main;
