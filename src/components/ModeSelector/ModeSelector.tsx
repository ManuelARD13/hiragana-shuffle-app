import React, { Dispatch } from "react";

import { ActionTypes, JPChar } from "../../models/charsets.model";


interface ModeSelectorProps {
  dispatch: Dispatch<ActionTypes>;
  gameCharset: JPChar[] | undefined;
  randomChar: (charset: JPChar[]) => void;
}

function ModeSelector({ dispatch, gameCharset, randomChar }: ModeSelectorProps) {

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
        dispatch(ActionTypes.SET_HIRAGANA_AND_KATAKANA);
      } else if (level === "hiragana-words") {
        dispatch(ActionTypes.SET_HIRAGANA_WORDS);
      } else if (level === "katakana-words") {
        dispatch(ActionTypes.SET_KATAKANA_WORDS);
      } else if (level === "hiragana-special") {
        dispatch(ActionTypes.SET_HIRAGANA_SPECIAL);
      } else if (level === "katakana-special") {
        dispatch(ActionTypes.SET_KATAKANA_SPECIAL);
      }
    }

  };

  return (
  <>
    <fieldset>
      <label htmlFor="hiragana">hiragana</label>
      <input
        type="radio"
        name="level"
        id="hiragana"
        onChange={levelRadioHandler}
      />
      <label htmlFor="katakana">katakana</label>
      <input
        type="radio"
        name="level"
        id="katakana"
        onChange={levelRadioHandler}
      />
      <label htmlFor="hiragana-2">hiragana 2</label>
      <input
        type="radio"
        name="level"
        id="hiragana-2"
        onChange={levelRadioHandler}
      />
      <label htmlFor="katakana-2">katakana 2</label>
      <input
        type="radio"
        name="level"
        id="katakana-2"
        onChange={levelRadioHandler}
      />
      <label htmlFor="hiragana-and-katakana">hiragana and katakana</label>
      <input
        type="radio"
        name="level"
        id="hiragana-and-katakana"
        onChange={levelRadioHandler}
      />
    </fieldset>
    </>
  );
}

export default ModeSelector;
