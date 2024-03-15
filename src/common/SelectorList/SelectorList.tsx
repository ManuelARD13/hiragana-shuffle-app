//React
import React, { useEffect, useState } from "react";
//Type
import { Charset, Mode } from "models/charsets.model";
//Components
import Modal from "common/Modal/Modal";

type SelectorsListProps = {
  title: string;
  selectorList: Mode[];
  onCloseCallback: () => void;
  checkboxHandler: (id: string) => void;
  returnButtonCallback?: () => void;
};

function SelectorsList({
  title,
  selectorList,
  onCloseCallback,
  checkboxHandler,
  returnButtonCallback
}: SelectorsListProps) {
  const [isModeSelected, setIsModeSelected] = useState<boolean>(false);

  const button = document.querySelector(".mode-selector__btn");
  const btnBackground = document.querySelector(".modal__btn-container");

  const onChangeRadioHandler = (
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
        checkboxHandler(event.target.id);
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

  const handleCloseTransition = () => {
    const radioSelectors = Array.from(document.getElementsByTagName("label"));
    if (button && btnBackground) {
      button.classList.add("puff-out-center");
      btnBackground.classList.remove("btn-background");
    }
    if (radioSelectors.length > 0) {
      radioSelectors.forEach((radioSelector) => {
        radioSelector.classList.add("slide-out-elliptic-top-bck");
      });
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

  const renderList = (selectorList: Mode[]) => {
    return selectorList.map((selector) => (
      <div key={selector.id} className="mode-selector__container">
        <input
          type="radio"
          name="mode"
          id={selector.id}
          className={`${
            selector.isLocked
              ? "mode-selector__radio-input--locked"
              : "mode-selector__radio-input"
          }`}
          onChange={onChangeRadioHandler}
        />
        <label
          htmlFor={selector.id}
          className={`mode-selector__label ${
            selector.isLocked ? "locked" : ""
          }`}
        >
          <p>{selector.name}</p>
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
    ));
  };
  return (
    <Modal
      buttonCallback={onCloseCallback}
      buttonText={"Continue"}
      modalBackground={"day-jp-bk.jpg"}
      className="mode-selector"
      buttonClassName="mode-selector__btn"
      returnButton
      returnButtonCallback={returnButtonCallback}
    >
      <h1>{title}</h1>
      <fieldset className="mode-selector__fieldset">
        {renderList(selectorList)}
      </fieldset>
    </Modal>
  );
}

export default SelectorsList;