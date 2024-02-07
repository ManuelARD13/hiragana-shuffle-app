import React, { PropsWithChildren, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  buttonCallback: () => void;
  secondaryButton?: boolean;
  secondaryButtonCallback?: () => void;
  buttonText: string;
  secondaryButtonText?: string;
  buttonClassName?: string;
  secondaryButtonClassName?: string;
  className?: string;
  modalBackground?: string;
};

function Modal({
  children,
  buttonCallback,
  buttonText,
  buttonClassName,
  className,
  modalBackground,
  secondaryButton = false,
  secondaryButtonCallback = () => {},
  secondaryButtonText = "",
  secondaryButtonClassName = ""
}: PropsWithChildren<ModalProps>) {
  const [isActive, setIsActive] = useState(true);
  const modalRoot = document.getElementById("modal")!;
  const modal = useRef<HTMLDivElement>(null);
  modal.current?.classList.remove("modal-hidden");

  let bkImg = "";
  let modalStyles = {};

  if (modalBackground) {
    bkImg = require(`../../img/${modalBackground}`).default;
    modalStyles = {
      backgroundImage: `url(${bkImg})`,
    };
  }

  const handleClose = () => {
    document
      .getElementsByClassName("modal__overlay")[0]
      .classList.add("modal-transition");
    setTimeout(() => {
      modal.current?.classList.toggle("modal-hidden");
      buttonCallback();
      setIsActive(false);
    }, 1500);
  };

  const secondaryHandleClose = () => {
    document
      .getElementsByClassName("modal__overlay")[0]
      .classList.add("modal-transition");
    setTimeout(() => {
      modal.current?.classList.toggle("modal-hidden");
      setIsActive(false);
      secondaryButtonCallback();
    }, 1500);
  }
  return (
    <>
      {isActive
        ? createPortal(
            <div
              className={`modal ${className ? className : ""}`}
              style={modalStyles}
              ref={modal}
            >
              <div className="modal__overlay"></div>
              {children}
              <div className="modal__btn-container">
                <button onClick={handleClose} className={buttonClassName}>
                  {buttonText}
                </button>
                {secondaryButton ? (
                  <button
                    onClick={secondaryHandleClose}
                    className={secondaryButtonClassName}
                  >
                    {secondaryButtonText}
                  </button>
                ) : null}
              </div>
            </div>,
            modalRoot
          )
        : null}
    </>
  );
}

export default Modal;
