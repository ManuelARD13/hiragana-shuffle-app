import React, { useEffect, useRef, useState } from "react";
import { Charset, Screen } from "../../models/charsets.model";

import Modal from "../../common/Modal/Modal";

import { useAppContext } from "../../context/AppContext";

interface ModeSelectorProps {
  buttonCallback: (value: Screen) => void;
  setIsGameRunning: (value: boolean) => void;
}

type Mode = {
  name: string;
  id: keyof typeof Charset;
  isLocked: boolean;
};

function ModeSelector({ buttonCallback, setIsGameRunning }: ModeSelectorProps) {
  const { setCharsetName } = useAppContext();

  const modes: Mode[] = [
    {
      name: "Hiragana",
      id: "HIRAGANA",
      isLocked: false,
    },
    {
      name: "Katakana",
      id: "KATAKANA",
      isLocked: false,
    },
    {
      name: "Hiragana (ten-tens & maru)",
      id: "HIRAGANA_TENTEN_MARU",
      isLocked: false,
    },
    {
      name: "Hiragana (Full Set!)",
      id: "HIRAGANA_FULLSET",
      isLocked: false,
    },
    {
      name: "Hiragana (Youon)",
      id: "HIRAGANA_YOUON",
      isLocked: false,
    },
    // {
    //   name: "Katakana (Ten-Ten & Maru)",
    //   id: "katakana-2",
    //   isLocked: false,
    // },
    // {
    //   name: "Full Set!",
    //   id: "hiragana-and-katakana",
    //   isLocked: false,
    // },
    {
      name: "Japanese Words",
      id: "HIRAGANA_WORDS",
      isLocked: true,
    },
  ];

  const [isModeSelected, setIsModeSelected] = useState<boolean>(false);

  const button = document.querySelector(".mode-selector__btn");
  const btnBackground = document.querySelector(".modal__btn-container");

  const levelRadioHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.checked) {
      const radioSelector = document.querySelector(`#${event.target.id}`);
      if (
        radioSelector &&
        !radioSelector.classList.contains(
          "mode-selector__radio-input--locked"
        ) &&
        radioSelector.id in Charset
      ) {
        setCharsetName(Charset[event.target.id as keyof typeof Charset]);
        setIsModeSelected(true);
      } else {
        const button = document.querySelector(".mode-selector__btn");
        if (button) {
          button.classList.remove("active");
        }
        if (btnBackground) {
          btnBackground.classList.remove("btn-background");
        }
        setIsModeSelected(false);
      }
    }
  };

  useEffect(() => {
    if (isModeSelected && btnBackground && button) {
      btnBackground.classList.add("btn-background");

      button.classList.add("slide-in-bottom-instant");
      button.classList.add("active");
      button.addEventListener("click", handleCloseTransition);
    }
  }, [isModeSelected]);

  const handleClose = () => {
    buttonCallback(Screen.start);
    setIsGameRunning(true);
  };

  const handleCloseTransition = () => {
    const radioSelectors = Array.from(document.getElementsByTagName("label"));
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
          <div key={mode.id} className="mode-selector__container">
            <input
              type="radio"
              name="mode"
              id={mode.id}
              className={`${
                mode.isLocked
                  ? "mode-selector__radio-input--locked"
                  : "mode-selector__radio-input"
              }`}
              onChange={levelRadioHandler}
            />
            <label
              htmlFor={mode.id}
              className={`mode-selector__label ${
                mode.isLocked ? "locked" : ""
              }`}
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
          </div>
        ))}
      </fieldset>
    </Modal>
  );
}

export default ModeSelector;
