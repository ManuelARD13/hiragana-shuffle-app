import React, { useState, useEffect } from 'react';
import MainImage from '../../components/MainImage/MainImage';
import Input from '../../components/Input/Input';
import Scores from '../../components/Scores/Scores';

import charSet from "../../data.json";
import { HiraganaCharset, KatakanaCharset } from '../../models/charsets.model';

function Main() {

  const [ char, setChar ] = useState({
    0: "",
    1: ""
  })
  const [score, setScore] = useState<number>(0);

  const hiragana: HiraganaCharset | undefined = charSet[0].hiragana?.base
  const katakana: KatakanaCharset | undefined = charSet[1].katakana?.base

  const randomChar = (charset: HiraganaCharset | KatakanaCharset): void => {
    if(Object.keys(charset).length > 0) {
      setChar(Object.entries(charset)[Math.floor(Math.random() * Object.keys(charset).length)]);
    } else {
      setChar({0: "", 1: ""});
    }
  }

  useEffect(() => {
    if(hiragana) {
      randomChar(hiragana);
    }
  }, [score]);

  

  const validateAnswer = (input: string): boolean => {
    if(char[0] === input) {
      return true
    } else {
      return false
    }
  }

  return (
    <main>
      <h1>Higarana Shuffle</h1>
      <MainImage char={char} />
      <Input validateAnswer={validateAnswer} setScore={setScore} score={score} />
      <Scores score={score} level={1} />
    </main>
  );
}

export default Main