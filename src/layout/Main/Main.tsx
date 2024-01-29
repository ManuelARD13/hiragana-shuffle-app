import React, { useState } from 'react';
import MainImage from '../../components/MainImage/MainImage';
import Input from '../../components/Input/Input';
import Scores from '../../components/Scores/Scores';

function Main() {

  const [ char, setChar ] = useState("")

  const validateAnswer = (input: string): boolean => {
    if(char[0] === input) {
      return true
    } else {
      return false
    }
  }

  return (
    <div>
      <h1>Higarana Shuffle</h1>
      <MainImage char={char} setChar={setChar} />
      <p>Correct!</p>
      <Input validateAnswer={validateAnswer} />
      <Scores score={9999} level={1} />
    </div>
  );
}

export default Main