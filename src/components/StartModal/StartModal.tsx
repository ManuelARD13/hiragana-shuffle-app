import React, { useEffect } from "react";
import Modal from "../../common/Modal/Modal";

type StartModalProps = {
  setIsGameRunning: (value: boolean) => void;
  isAudioAllowed: boolean;
};

function StartModal({ setIsGameRunning, isAudioAllowed }: StartModalProps) {
  const mainTheme = require("../../music/Main-Theme.mp3").default;

  setInterval(() => {
    const logo = document.querySelector(".start-modal__logo");
    if (logo) {
      setTimeout(() => {
        logo.classList.remove("slide-in-top");
        logo.classList.remove("jello-diagonal-2");
      }, 2000)
      logo.classList.add("jello-diagonal-2");
    }
  },5000)

  const handleCloseTransition = () => {
    const logo = document.querySelector(".start-modal__logo");
    const button = document.querySelector(".start-modal__btn");
    if (logo) {
      logo.classList.add("slide-out-elliptic-top-bck");
    }
    if (button) {
      button.classList.add("puff-out-center");
    }
  }

 useEffect(() => {
   const button = document.querySelector(".start-modal__btn");
   if (button) {
     button.addEventListener("click", handleCloseTransition);
   }
 }, [])

  return (
    <Modal
      buttonCallback={() => setIsGameRunning(true)}
      buttonClassName={"start-modal__btn slide-in-bottom"}
      buttonText={"START"}
      modalBackground={"day-jp-bk.jpg"}
    >
      <div className="start-modal__gif">
        <img src={require("../../img/wei-mao-fan-img-4052.gif").default} alt="sakura" />
        <video src="../../img/vecteezy_sakura-falling-leaf-green-screen_16470436.mov"></video>
      </div>
      <div className="start-modal__logo slide-in-top">
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
       <audio src={mainTheme} autoPlay muted={!isAudioAllowed} loop />
    </Modal>
  );
}

export default StartModal;
