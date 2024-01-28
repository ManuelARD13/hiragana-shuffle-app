import React from 'react';


const charSet = {
    "a": "ぁ",
    "i": "ぃ",
    "u": "ぅ",
    "e": "ぇ",
    "o": "ぉ",
    "ka": "か",
    "ki": "き",
    "ku": "く",
    "ke": "け",
    "ko": "こ",
    "sa": "さ",
    "shi": "し",
    "su": "す",
    "se": "せ",
    "so": "そ",
    "ta": "た",
    "chi": "ち",
    "tsu": "つ",
    "te": "て",
    "to": "と",
    "na": "な",
    "ni": "に",
    "nu": "ぬ",
    "ne": "ね",
    "no": "の",
    "ha": "は",
    "hi": "ひ",
    "fu": "ふ",
    "he": "へ",
    "ho": "ほ",
    "ma": "ま",
    "mi": "み",
    "mu": "む",
    "me": "め",
    "mo": "も",
    "ya": "や",
    "yu": "ゆ",
    "yo": "よ",
    "ra": "ら",
    "ri": "り",
    "ru": "る",
    "re": "れ",
    "ro": "ろ",
    "wa": "わ",
    "wo": "を",
    "n": "ん"
  }

function MainImage() {


  const randomChar = () => {
    return Object.values(charSet)[Math.floor(Math.random() * Object.keys(charSet).length)];
  }

  return (
    <div className='main-image'>
      <p>
      {randomChar()}
      </p>
    </div>
  );
}

export default MainImage;