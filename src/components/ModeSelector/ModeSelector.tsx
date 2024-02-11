import React, { useEffect, useState } from "react";
import type { Dispatch } from "react";
import { Screen } from "../../models/charsets.model";

import Modal from "../../common/Modal/Modal";

import { ActionTypes } from "../../models/charsets.model";

interface ModeSelectorProps {
  dispatch: Dispatch<ActionTypes>;
  buttonCallback: (value: Screen) => void;
  setIsGameRunning: (value: boolean) => void;
  setGameCharset: () => void;
}

function ModeSelector({
  dispatch,
  buttonCallback,
  setIsGameRunning,
  setGameCharset,
}: ModeSelectorProps) {
  const modes = [
    {
      name: "Hiragana",
      id: "hiragana",
      isLocked: false,
    },
    {
      name: "Katakana",
      id: "katakana",
      isLocked: false,
    },
    {
      name: "Hiragana (Ten-Ten & Maru)",
      id: "hiragana-2",
      isLocked: false,
    },
    {
      name: "Katakana (Ten-Ten & Maru)",
      id: "katakana-2",
      isLocked: false,
    },
    {
      name: "Full Set!",
      id: "hiragana-and-katakana",
      isLocked: false,
    },
    {
      name: "Japanese Words",
      id: "hiragana-words",
      isLocked: true,
    },
  ];

  const [isModeSelected, setIsModeSelected] = useState<boolean>(false);

  const button = document.querySelector(".mode-selector__btn");

  const levelRadioHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.checked) {
      const level = event.target.id;
      if (level === "hiragana") {
        dispatch(ActionTypes.SET_HIRAGANA);
      } else if (level === "katakana") {
        dispatch(ActionTypes.SET_KATAKANA);
      } else if (level === "hiragana-2") {
        dispatch(ActionTypes.SET_HIRAGANA_2);
      } else if (level === "katakana-2") {
        dispatch(ActionTypes.SET_KATAKANA_2);
      } else if (level === "hiragana-and-katakana") {
        dispatch(ActionTypes.SET_HIRAGANA_AND_KATAKANA_FULL);
      } else if (level === "hiragana-words") {
        if (modes[5].isLocked) {
          const button = document.querySelector(".mode-selector__btn");
          if (button) {
            button.classList.remove("active");
          }
          setIsModeSelected(false);
          return;
        }
      } else if (level === "katakana-words") {
        dispatch(ActionTypes.SET_KATAKANA_WORDS);
      } else if (level === "hiragana-special") {
        dispatch(ActionTypes.SET_HIRAGANA_SPECIAL);
      } else if (level === "katakana-special") {
        dispatch(ActionTypes.SET_KATAKANA_SPECIAL);
      }

      setIsModeSelected(true);
    }
  };

  useEffect(() => {
    if (isModeSelected && button) {
      button.classList.add("slide-in-bottom-instant");
      button.classList.add("active");
      button.addEventListener("click", handleCloseTransition);
    }
  }, [isModeSelected]);

  const handleClose = () => {
    setGameCharset();
    buttonCallback(Screen.start);
    setIsGameRunning(true);
  };

  const handleCloseTransition = () => {
    const radioSelectors = document.querySelectorAll(".mode-selector__label");
    if (button) {
      button.classList.add("puff-out-center");
    }
    if (radioSelectors.length > 0) {
      radioSelectors.forEach((radioSelector) => {
        radioSelector.classList.add("slide-out-elliptic-top-bck");
      });
    }
  };

  return (
    <Modal
      buttonCallback={handleClose}
      buttonText={"Continue"}
      modalBackground={"day-jp-bk.jpg"}
      className="mode-selector"
      buttonClassName="mode-selector__btn"
    >
      <h1>Which set are we gonna practice today?</h1>
      <fieldset className="mode-selector__fieldset">
        {modes.map((mode) => (
          <>
            <input
              type="radio"
              name="mode"
              id={mode.id}
              className={`${mode.isLocked ? "mode-selector__radio-input--locked" : "mode-selector__radio-input"}`}
              onChange={levelRadioHandler}
            />
            <label
              htmlFor={mode.id}
              className={` ${mode.isLocked ? "mode-selector__label--locked" : "mode-selector__label"}`}
            >
              <p>{mode.name}</p>
              <div className="mode-selector__label-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className="bi bi-lock-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
                </svg>
              </div>
            </label>
          </>
        ))}
      </fieldset>
    </Modal>
  );
}

export default ModeSelector;
