import { Charset } from "../../models/charsets.model";

const BASE_URL: string = "https://api.jsonbin.io/v3/b";

const charsetsIds = {
  hiragana: "65d3f3c01f5677401f319df5",
  hiragana_fullset: "65d4e30bdc74654018a76ccd",
  hiragana_words: "65d3f453dc74654018a712cf",
  hiragana_youon: "65d3f42e1f5677401f319e22",
  hiragana_tenten_maru: "65d3f3fa1f5677401f319e0d",
  katakana: "65dfb4b1dc74654018ab4a47",
};

export const endPoints = (charset: string): string => {
  switch (charset) {
    case Charset.HIRAGANA:
      return `${BASE_URL}/${charsetsIds.hiragana}`;
    case Charset.HIRAGANA_FULLSET:
      return `${BASE_URL}/${charsetsIds.hiragana_fullset}`;
    case Charset.HIRAGANA_WORDS:
      return `${BASE_URL}/${charsetsIds.hiragana_words}`;
    case Charset.HIRAGANA_YOUON:
      return `${BASE_URL}/${charsetsIds.hiragana_youon}`;
    case Charset.HIRAGANA_TENTEN_MARU:
      return `${BASE_URL}/${charsetsIds.hiragana_tenten_maru}`;
    case Charset.KATAKANA:
      return `${BASE_URL}/${charsetsIds.katakana}`;
    default:
      console.log("ERROR: Invalid charset");
      return "";
  }
};


