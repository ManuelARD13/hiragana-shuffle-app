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
    "Z",
    "C",
    "B",
    "N",
    "M",
  ];

  const handleClick = (event: React.TouchEvent<HTMLButtonElement>) => {
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
          <tr>
            {keys.slice(0, 10).map((key) => (
              <td>
                <button
                  id="key"
                  className="keyboard__key"
                  onTouchStart={handleClick}
                >
                  {key}
                </button>
              </td>
            ))}
          </tr>
          <tr>
            {keys.slice(10, 18).map((key) => (
              <td>
                <button
                  id="key"
                  className="keyboard__key"
                  onTouchStart={handleClick}
                >
                  {key}
                </button>
              </td>
            ))}
            <td>
              <button
                id="enter"
                className="keyboard__key--enter"
                onTouchStart={handleClick}
              >
                行け！
              </button>
            </td>
          </tr>
          <tr>
            {keys.slice(18, keys.length).map((key) => (
              <td>
                <button
                  id="key"
                  className="keyboard__key"
                  onTouchStart={handleClick}
                >
                  {key}
                </button>
              </td>
            ))}
            <td>
              <button
                id="backspace"
                className="keyboard__key--backspace"
                onTouchStart={handleClick}
              >
                {"<-"}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Keyboard;
