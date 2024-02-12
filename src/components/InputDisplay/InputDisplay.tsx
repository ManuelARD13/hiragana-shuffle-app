import React from "react";

type InputProps = {
  input: string;
  message: string;
  setInput: (input: string) => void;
  handleSubmit: () => void;
};

function InputDisplay({ input, message, setInput, handleSubmit }: InputProps) {
  return (
    <div className="input">
      <div className="input__message slide-in-left">
        <p>{message ? message : ""}</p>
      </div>
      <div className="input__form">
        <input
          type="text"
          value={input}
          placeholder="Type your answer!"
          className="slide-in-right"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
      </div>
    </div>
  );
}

export default InputDisplay;
