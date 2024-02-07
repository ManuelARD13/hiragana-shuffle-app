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
      <div className="input__message">
        <p>{message ? message : ""}</p>
      </div>
      <div className="input__form">
        <input
          type="text"
          autoFocus
          value={input}
          placeholder="'ha'"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
      </div>
    </div>
  );
}

export default InputDisplay;
