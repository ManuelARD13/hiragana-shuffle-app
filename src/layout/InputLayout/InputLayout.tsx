import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import InputDisplay from "../../components/InputDisplay/InputDisplay";
import Scores from "../../components/Scores/Scores";
import Keyboard from "../../components/Keyboard/Keyboard";

import type { JPChar } from "../../models/charsets.model";
import { useAppContext } from "../../context/AppContext";
import MainImage from "../../components/MainImage/MainImage";

interface InputLayoutProps {
  isGameRunning: boolean;
  setIsGameRunning: Dispatch<SetStateAction<boolean>>;
  setIsGameOver: Dispatch<SetStateAction<boolean>>;
}

function InputLayout({ isGameRunning, setIsGameRunning, setIsGameOver }: InputLayoutProps) {
  const { gameLogic } = useAppContext();

  const [message, setMessage] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [char, setChar] = useState<JPChar>({
    character: "",
    romaji: "",
  });

  const validateAnswer = (input: string): boolean => {
    if (char.romaji === input.toLocaleLowerCase()) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (): void => {
    const inputMessage = document.querySelector(".input__message");

    const successAnswer = validateAnswer(input);

    if (successAnswer) {
      inputMessage?.classList.remove("success");
      inputMessage?.classList.add("success");

      setMessage("Correct! 頑張って!");
      setScore(score + 1);
      setInput("");
      gameLogic.updateCharset(char);
      const newChar = gameLogic.getRandomCharacter();
      console.log(newChar);
      if(newChar) {
        setChar(newChar);
      }else {
        setIsGameOver(true);
        setIsGameRunning(false);
      }
    } else {
      inputMessage?.classList.remove("success");
      inputMessage?.classList.remove("error");
      inputMessage?.classList.add("error");

      setMessage("Wrong! Try again");
      setInput("");
    }
  };

  useEffect(() => {
    const newChar = gameLogic.getRandomCharacter();
    if(newChar) {
      setChar(newChar);
    }
  }, []);

  return (
    <>
      <MainImage char={char.character} />
      <h2 className="input__title">How is it read?</h2>
      <Scores score={score} level={1} isGameRunning={isGameRunning} />
      <InputDisplay
        input={input}
        message={message}
        setInput={setInput}
        handleSubmit={handleSubmit}
      />
      <Keyboard input={input} setInput={setInput} handleSubmit={handleSubmit} />
    </>
  );
}

export default InputLayout;
