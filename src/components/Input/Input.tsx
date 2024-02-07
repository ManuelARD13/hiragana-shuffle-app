import React, { useState } from "react";

type InputProps = {
  validateAnswer: (input: string) => boolean;
  setScore: (score: number) => void;
  score: number;
  updateGameCharset: () => void
};

function Input({ validateAnswer, setScore, score, updateGameCharset }: InputProps) {
  const [input, setInput] = useState<string>("");
  const [message, setMessage] = useState<string>("");

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
    <div className="input">
       <div className="input__message">
        <p>{message ? message : ""}</p>
      </div>
      <div className="input__form">
        <input
          type="text"
          autoFocus
          value={input}
          placeholder="'ha'"
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="input__btn"  onClick={handleSubmit}>行け！</button>
      </div>
    </div>
  );
}

export default Input;
