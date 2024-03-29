import React from "react";
import Modal from "common/Modal/Modal";
import { useAppContext } from "context/AppContext";
import { GameAction, Screen } from "models/charsets.model";

function PermissionsModal() {
  const { gameState, gameDispatch } = useAppContext();
  const allowFullScreen = () => {
    document.body.requestFullscreen();
    gameDispatch({type: GameAction.SET_SCREEN, payload: Screen.intro});
    gameDispatch({type: GameAction.SET_IS_AUDIO_ALLOWED, payload: true});
  }

  return (
    <Modal
      buttonCallback={allowFullScreen}
      buttonText={"Allow"}
      buttonClassName={"permissions-modal__btn"}
      className="permissions-modal"
      secondaryButton={true}
      secondaryButtonText="Disallow"
      secondaryButtonClassName={"permissions-modal__btn--cancel"}
      secondaryButtonCallback={() => {
        gameDispatch({ type: GameAction.SET_SCREEN, payload: Screen.intro });
        gameDispatch({ type: GameAction.SET_IS_AUDIO_ALLOWED, payload: false }); 
      }}
    >
      <div className="permissions-modal__icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="65"
          height="65"
          fill={"#FFFFFF"}
          className="bi bi-headphones"
          viewBox="0 0 16 16"
        >
          <path d="M8 3a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a6 6 0 1 1 12 0v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1V8a5 5 0 0 0-5-5" />
        </svg>
      </div>
      <p>Allow sound for a better experience. Thank you!</p>
    </Modal>
  );
}

export default PermissionsModal;
