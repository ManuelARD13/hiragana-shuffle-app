import React from "react";
import Modal from "../../common/Modal/Modal";

type StartModalProps = {
  setIsGameRunning: (value: boolean) => void;
};

function StartModal({ setIsGameRunning }: StartModalProps) {
  return (
    <Modal
      buttonCallback={() => setIsGameRunning(true)}
      buttonClassName={"start-modal__btn"}
      buttonText={"START"}
    >
      <div className="start-modal__logo">
        <img
          src={
            require("../../img/hiragana-shuffle-logo-removebg-preview.png")
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
