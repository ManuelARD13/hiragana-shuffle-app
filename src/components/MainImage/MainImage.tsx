import React, { useEffect } from 'react';
import charSet from "../../data.json";
import { HiraganaCharset, KatakanaCharset } from '../../models/charsets.model';



function MainImage({ char, setChar }: any) {

  const hiragana: HiraganaCharset | undefined = charSet[0].hiragana?.base
  const katakana: KatakanaCharset | undefined = charSet[1].katakana?.base

  const randomChar = (charset: HiraganaCharset | KatakanaCharset): void => {
    if(Object.keys(charset).length > 0) {
      setChar(Object.entries(charset)[Math.floor(Math.random() * Object.keys(charset).length)]);
    } else {
      setChar("");
    }
    
  }

  useEffect(() => {
    if(hiragana) {
      randomChar(hiragana);
    }
  }, []);

  return (
    <div className='main-image'>
      <p>
        {char[1]}
      </p>
    </div>
  );
}

export default MainImage;