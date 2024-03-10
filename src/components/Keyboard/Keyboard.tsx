import React from "react";

interface KeyboardProps {
  setInput: (input: string) => void;
  input: string;
  handleSubmit: () => void;
}

function Keyboard({ setInput, input, handleSubmit }: KeyboardProps) {
  
  const keys = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "Z",
    "X",
    "C",
    "B",
    "V",
    "N",
    "M",
  ];

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const target: string = event.currentTarget.id;
    if (target !== "enter" && target !== "backspace") {
      setInput(input + target.toLocaleLowerCase());
    } else if (target === "enter") {
      handleSubmit();
    } else {
      setInput(input.slice(0, -1));
    }
  };

  return (
    <>
      <table className="keyboard">
        <tbody>
          <tr className="keyboard__row">
            {keys.slice(0, 10).map((key) => (
              <td key={key}>
                <button
                  key={key}
                  id={key}
                  className="keyboard__key"
                  onClick={handleClick}
                >
                  {key}
                </button>
              </td>
            ))}
          </tr>
          <tr className="keyboard__row">
            {keys.slice(10, 19).map((key) => (
              <td>
                <button
                  key={key}
                  id={key}
                  className="keyboard__key"
                  onClick={handleClick}
                >
                  {key}
                </button>
              </td>
            ))}
            
          </tr>
          <tr className="keyboard__row--last">
            {keys.slice(19, keys.length).map((key) => (
              <td>
                <button
                  key={key}
                  id={key}
                  className="keyboard__key"
                  onClick={handleClick}
                >
                  {key}
                </button>
              </td>
            ))}
            <td>
              <button
                id="backspace"
                className="keyboard__key--backspace"
                onClick={handleClick}
              >
                {"<"}
              </button>
            </td>
          </tr>
          <tr>
          <td>
              <button
                id="enter"
                className="keyboard__key--enter"
                onClick={handleClick}
              >
                行け！
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Keyboard;
