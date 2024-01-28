import React from 'react';
import MainImage from '../../components/MainImage/MainImage';
import Input from '../../components/Input/Input';
import Scores from '../../components/Scores/Scores';

function Main() {
  return (
    <div>
      <h1>Higarana Shuffle</h1>
      <MainImage />
      <p>Correct!</p>
      <Input />
      <Scores score={9999} level={1} />
    </div>
  );
}

export default Main