export interface JPChar {
  character: string;
  romaji: string;
  score?: number;
}

export enum Charset {
  HIRAGANA = "HIRAGANA",
  HIRAGANA_FULLSET = "HIRAGANA_FULLSET",
  HIRAGANA_WORDS = "HIRAGANA_WORDS",
  HIRAGANA_YOUON = "HIRAGANA_YOUON",
  HIRAGANA_TENTEN_MARU = "HIRAGANA_TENTEN_MARU",
  KATAKANA = "KATAKANA",
}

export enum Screen {
  start = "start",
  modeSelector = "mode_selector",
  intro = "intro",
  permissions = "permissions",
}

export interface GameLogic {
  char: JPChar;
  updateCharset: (char: JPChar) => void;
  getRandomCharacter: () => JPChar;
}

export class GameCharset {
  charset: JPChar[];
  constructor(charset: JPChar[]) {
    this.charset = charset;
  }

  updateCharset(char: JPChar) {
   
      let newCharset: JPChar[] = [];
    if (this.charset.length > 0) {
      newCharset = this.charset.filter(
        (character) => char.romaji !== character.romaji
      );
      this.charset = newCharset;
      if (newCharset.length === 0) {
        return false;
      }
    }
    return true
  }

  getRandomCharacter(): JPChar | null {
      if (this.charset.length > 0) {
        const randomChar = this.charset[Math.floor(Math.random() * this.charset.length)];
        return randomChar;
      } else {
        return null;
      }
    }
}


