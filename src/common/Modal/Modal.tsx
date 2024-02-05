import React, { PropsWithChildren, useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  buttonCallback: () => void;
  buttonText: string;
  buttonClassName?: string
};

function Modal({ children, buttonCallback, buttonClassName, buttonText }: PropsWithChildren<ModalProps>) {
  const [isActive, setIsActive] = useState(true);
  const modalRoot = document.getElementById("modal")!;

  const bkImg = require("../../img/day-jp-bk.jpg").default;
  modalRoot.style.backgroundImage = `url(${bkImg})`;

  const handleClose = () => {
    document.getElementsByClassName("modal__overlay")[0].classList.add("modal-transition");
    setTimeout(() => {
      modalRoot.classList.toggle("modal-hidden");
      setIsActive(false);
      buttonCallback();
    }, 1500)
    
  };
  return (
    <>
      {
        isActive ?
          createPortal(
            <>  
                <div className="modal__overlay"></div>
                {children}
                <button onClick={handleClose} className={buttonClassName} >
                  {buttonText}
                </button>
            </>,
            modalRoot
          )
        : null
      }
    </>
  );
}

export default Modal;