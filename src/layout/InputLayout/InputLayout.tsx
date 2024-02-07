import React, { useState } from "react";

import InputDisplay from "../../components/InputDisplay/InputDisplay";
import Scores from "../../components/Scores/Scores";
import Keyboard from "../../components/Keyboard/Keyboard";

import type { JPChar } from "../../models/charsets.model";

interface InputLayoutProps {
  char: JPChar;
  updateGameCharset: () => void;
  isGameRunning: boolean;
}

function InputLayout({
  char,
  updateGameCharset,
  isGameRunning,
}: InputLayoutProps) {
  
  const [message, setMessage] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [score, setScore] = useState<number>(0);

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
      updateGameCharset();
    } else {
      inputMessage?.classList.remove("success");
      inputMessage?.classList.remove("error");
      inputMessage?.classList.add("error");

      setMessage("Wrong! Try again");
      setInput("");
    }
  };

  return (
    <>
      <InputDisplay
        input={input}
        message={message}
        setInput={setInput}
        handleSubmit={handleSubmit}
      />
      <Scores score={score} level={1} isGameRunning={isGameRunning} />
      <Keyboard input={input} setInput={setInput}  handleSubmit={handleSubmit} />
    </>
  );
}

export default InputLayout;
