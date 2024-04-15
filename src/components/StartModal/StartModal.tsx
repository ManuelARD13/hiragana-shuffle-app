import React, { useEffect } from "react";
import Modal from "common/Modal/Modal";

import { GameAction, Screen } from "models/charsets.model";
import { useAppContext } from "context/AppContext";

function StartModal() {
  const { gameDispatch } = useAppContext();

  setInterval(() => {
    const logo = document.querySelector(".start-modal__logo");
    if (logo) {
      setTimeout(() => {
        logo.classList.remove("slide-in-top");
        logo.classList.remove("jello-diagonal-2");
      }, 2000);
      logo.classList.add("jello-diagonal-2");
    }
  }, 4000);

  const handleCloseTransition = () => {
    const logo = document.querySelector(".start-modal__logo");
    const button = document.querySelector(".start-modal__btn");
    if (logo) {
      logo.classList.add("slide-out-elliptic-top-bck");
    }
    if (button) {
      button.classList.add("puff-out-center");
    }
  };

  useEffect(() => {
    gameDispatch({ type: GameAction.SET_IS_GAME_LOADING, payload: true });
    const button = document.querySelector(".start-modal__btn");
    if (button) {
      button.addEventListener("click", handleCloseTransition);
    }
  }, []);

  return (
    <Modal
      buttonCallback={() =>
        gameDispatch({ type: GameAction.SET_SCREEN, payload: Screen.modeSelector })
      }
      buttonClassName={"start-modal__btn slide-in-bottom"}
      buttonText={"START"}
      modalBackground={"day-jp-bk.jpg"}
      setIsLoading={(value: boolean) =>
        gameDispatch({ type: GameAction.SET_IS_GAME_LOADING, payload: value })
      }
    >
      <div className="start-modal__gif">
        <img
          src={require("img/wei-mao-fan-img-4052.gif").default}
          alt="sakura"
        />
      </div>
      <div className="start-modal__logo slide-in-top">
        <img
          src={
            require("img/hiragana-shuffle-logo-removebg-preview.png")
              .default
          }
          alt="hiragana-shuffle-logo"
        />
      </div>
      <div className="start-modal__footer">
        <p>
          Hiragana Shuffle!. Copyright &copy; 2024. By{" "}
          <a href="#">Cosmic Games</a>
        </p>
      </div>
    </Modal>
  );
}

export default StartModal;
