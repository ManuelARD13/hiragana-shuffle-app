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
  setIsLoading?: (value: boolean) => void;
  returnButton?: boolean;
  returnButtonCallback?: () => void;
};

function Modal({
  children,
  buttonCallback,
  buttonText,
  ...props
}: PropsWithChildren<ModalProps>) {
  const [isActive, setIsActive] = useState(true);
  const modalRoot = document.getElementById("modal")!;
  const modal = useRef<HTMLDivElement>(null);
  modal.current?.classList.remove("modal-hidden");

  let modalStyles = {};

  if (props.modalBackground) {
    const image = new Image();
    image.onload = () => {
      if (props.setIsLoading) {
        props.setIsLoading(false);
      }
    };
    image.src = require(`img/${props.modalBackground}`).default;
    modalStyles = {
      backgroundImage: `url(${image.src})`,
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
      if (props.secondaryButtonCallback) {
        props.secondaryButtonCallback();
      }
    }, 1500);
  };
  return (
    <>
      {isActive
        ? createPortal(
            <div
              className={`modal ${props.className ? props.className : ""}`}
              style={modalStyles}
              ref={modal}
            >
              { props.returnButton ? <div>
                <button
                  className="modal__btn-return"
                  onClick={props.returnButtonCallback}
                >
                  <img src={require("../../img/flecha-hacia-atras.png").default} alt="go-back" />
                </button>
              </div>: null }
              <div className="modal__overlay"></div>
              {children}
              <div className="modal__btn-container">
                <button onClick={handleClose} className={props.buttonClassName}>
                  {buttonText}
                </button>
                {props.secondaryButton ? (
                  <button
                    onClick={secondaryHandleClose}
                    className={props.secondaryButtonClassName}
                  >
                    {props.secondaryButtonText}
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
