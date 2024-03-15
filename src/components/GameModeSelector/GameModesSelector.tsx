//React
import React, { useEffect } from "react";
//Hooks
import { useAppContext } from "context/AppContext";
//Types
import {
  GameModes,
  Screen,
  type GameMode,
  GameAction,
} from "models/charsets.model";
//Components
import Modal from "common/Modal/Modal";

const gameModes: GameMode[] = [
  {
    name: "Let's Study!",
    JPName: "勉強しましょう!",
    value: GameModes.study,
    isLocked: true,
  },
  {
    name: "Practice",
    JPName: "練習する",
    value: GameModes.practice,
    isLocked: false,
  },
  {
    name: "Time Trial!",
    JPName: "タイムトライアル!",
    value: GameModes.timeTrial,
    isLocked: false,
  },
  {
    name: "Survival Mode!",
    JPName: "生存モード!",
    value: GameModes.survival,
    isLocked: false,
  },
];

function GameModeSelector() {
  const { gameDispatch } = useAppContext();

  let btnContainer = document.querySelector(".modal__btn-container");

  useEffect(() => {
    btnContainer = document.querySelector(".modal__btn-container");
    btnContainer?.classList.add("game-mode__btn-container");
  }, []);

  const checkboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isSelectorLocked = gameModes.find(
      (mode) => mode.value === e.target.id
    )?.isLocked;
    if (Object.values(GameModes).includes(e.target.id as GameModes)) {
      if (!isSelectorLocked) {
        btnContainer?.classList.add("active");
        gameDispatch({
          type: GameAction.SET_GAME_MODE,
          payload: GameModes[e.target.id as keyof typeof GameModes],
        });
      } else {
        btnContainer?.classList.remove("active");
      }
    } else {
      throw new Error("Invalid Game Mode, type structure violation");
    }
  };

  

  return (
    <Modal
      buttonText={"Continue"}
      className="game-mode__modal"
      buttonClassName="game-mode__btn"
      buttonCallback={() =>
        gameDispatch({
          type: GameAction.SET_SCREEN,
          payload: Screen.mayorCharsetSelector,
        })
      }
      modalBackground={"day-jp-bk.jpg"}
    >
      {gameModes.map((mode, index) => {
        return (
          <React.Fragment key={mode.value}>
            <label
              htmlFor={mode.value}
              key={mode.value}
              className={`game-mode slide-in-tr ${
                index === 0
                  ? "first-item"
                  : index === gameModes.length - 1
                  ? "last-item"
                  : ""
              } ${"color-" + (index + 1)}`}
            >
              <p>{mode.name}</p>
              <p>{mode.JPName}</p>
            </label>
            <input
              type="checkbox"
              name="gameMode"
              id={mode.value}
              className="game-mode__radio-input"
              onChange={checkboxHandler}
            />
          </React.Fragment>
        );
      })}
    </Modal>
  );
}

export default GameModeSelector;
