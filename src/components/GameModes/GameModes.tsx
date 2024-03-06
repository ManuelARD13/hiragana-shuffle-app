import React, { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";

import Modal from "../../common/Modal/Modal";

import { GameMode, Screen, type GameModeT } from "../../models/charsets.model";

const gameModes: GameModeT[] = [
  {
    name: "Let's Study!",
    JPName: "勉強しましょう!",
    value: GameMode.study,
    isLocked: true,
  },
  {
    name: "Practice",
    JPName: "練習する",
    value: GameMode.practice,
    isLocked: false,
  },
  {
    name: "Time Trial!",
    JPName: "タイムトライアル!",
    value: GameMode.timeTrial,
    isLocked: true,
  },
  {
    name: "Survival Mode!",
    JPName: "生存モード!",
    value: GameMode.survival,
    isLocked: true,
  },
];

function GameModes({ setScreen }: { setScreen: (screen: Screen) => void }) {
  const { setGameMode } = useAppContext();

  let btnContainer = document.querySelector(".modal__btn-container");

  useEffect(() => {
    btnContainer = document.querySelector(".modal__btn-container");
    btnContainer?.classList.add("game-mode__btn-container");
  }, []);

  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isSelectorLocked = gameModes.find(
      (mode) => mode.value === e.target.id
    )?.isLocked;
    if (Object.values(GameMode).includes(e.target.id as GameMode)) {
      const selectedMode = GameMode[e.target.id as keyof typeof GameMode];
      if (!isSelectorLocked) {
        btnContainer?.classList.add("active");
        setGameMode(selectedMode);
      } else {
        alert("is Locked!");
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
      buttonCallback={() => setScreen(Screen.charsetSelector)}
    >
      {gameModes.map((mode, index) => {
        return (
          <>
            <label
              htmlFor={mode.value}
              key={mode.value}
              className={`game-mode ${
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
              onChange={checkHandler}
            />
          </>
        );
      })}
    </Modal>
  );
}

export default GameModes;
