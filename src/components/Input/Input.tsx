import React, { useState } from "react";

type InputProps = {
  validateAnswer: (input: string) => boolean;
  setScore: (score: number) => void;
  score: number;
};

function Input({ validateAnswer, setScore, score }: InputProps) {
  const [input, setInput] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (): void => {
    const inputMessage = document.querySelector(".input__message");

    const successAnswer = validateAnswer(input);

    if (successAnswer) {
      inputMessage?.classList.remove("success");
      inputMessage?.classList.add("success");

      setMessage("Success! Keep going");
      setScore(score + 1);
      setInput("");
      
    } else {
      inputMessage?.classList.remove("success");

      setMessage("Wrong! Try again");
      setInput("");
    }
  };

  return (
    <div className="input">
       <div className="input__message success">
        <p>{message ? message : ""}</p>
      </div>
      <input
        type="text"
        autoFocus
        value={input}
        placeholder="'ha'"
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="input__btn"  onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Input;
