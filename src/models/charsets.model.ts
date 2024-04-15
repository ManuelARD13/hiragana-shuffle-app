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
  HIRAGANA_CHIISAI = "HIRAGANA_CHIISAI",
  KATAKANA = "KATAKANA",
  KATAKANA_FULLSET = "KATAKANA_FULLSET",
  KATAKANA_WORDS = "KATAKANA_WORDS",
  KATAKANA_YOUON = "KATAKANA_YOUON",
  KATAKANA_TENTEN_MARU = "KATAKANA_TENTEN_MARU",
  KATAKANA_CHIISAI = "KATAKANA_CHIISAI",
  HIRAGANA_KATAKANA = "HIRAGANA_KATAKANA",
  HIRAGANA_KATAKANA_FULLSET = "HIRAGANA_KATAKANA_FULLSET",
  HIRAGANA_KATAKANA_WORDS = "HIRAGANA_KATAKANA_WORDS",
  HIRAGANA_KATAKANA_YOUON = "HIRAGANA_KATAKANA_YOUON",
  HIRAGANA_KATAKANA_TENTEN_MARU = "HIRAGANA_KATAKANA_TENTEN_MARU",
  HIRAGANA_KATAKANA_CHIISAI = "HIRAGANA_KATAKANA_CHIISAI",
  KANJI = "KANJI",
}

export enum Screen {
  start = "start",
  mayorCharsetSelector = "mayor_charset_selector",
  charsetSelector = "charset_selector",
  modeSelector = "mode_selector",
  intro = "intro",
  permissions = "permissions",
  characterTable = "character_table",
  study = "study",
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
    return true;
  }

  getRandomCharacter(): JPChar | null {
    if (this.charset.length > 0) {
      const randomChar =
        this.charset[Math.floor(Math.random() * this.charset.length)];
      return randomChar;
    } else {
      return null;
    }
  }
}

export type GameMode = {
  name: string;
  JPName: string;
  value: GameModes;
  isLocked: boolean;
};

export enum GameModes {
  study = "study",
  practice = "practice",
  timeTrial = "timeTrial",
  survival = "survival",
}

export type GameState = {
  gameMode: GameModes;
  mayorCharset: Charset;
  screen: Screen;
  isGameRunning: boolean;
  isGameOver: boolean;
  isGameLoading: boolean;
  isAudioAllowed: boolean;
  timeAttackDifficulty: number;
};

export enum GameAction {
  SET_GAME_MODE = "SET_GAME_MODE",
  SET_MAYOR_CHARSET = "SET_MAYOR_CHARSET",
  SET_SCREEN = "SET_SCREEN",
  SET_IS_GAME_RUNNING = "SET_IS_GAME_RUNNING",
  SET_IS_GAME_OVER = "SET_IS_GAME_OVER",
  SET_IS_GAME_LOADING = "SET_IS_GAME_LOADING",
  SET_IS_AUDIO_ALLOWED = "SET_IS_AUDIO_ALLOWED",
  SET_TIME_ATTACK_DIFFICULTY = "SET_TIME_ATTACK_DIFFICULTY",
}
export type GameReducerTypes =
  | {
      type: GameAction.SET_MAYOR_CHARSET;
      payload: Charset;
    }
  | {
      type: GameAction.SET_GAME_MODE;
      payload: GameModes;
    }
  | {
      type: GameAction.SET_SCREEN;
      payload: Screen;
    }
  | {
      type: GameAction.SET_IS_GAME_RUNNING;
      payload: boolean;
    }
  | {
      type: GameAction.SET_IS_GAME_OVER;
      payload: boolean;
    }
  | {
      type: GameAction.SET_IS_GAME_LOADING;
      payload: boolean;
    }
  | {
      type: GameAction.SET_IS_AUDIO_ALLOWED;
      payload: boolean;
    }
  | {
      type: GameAction.SET_TIME_ATTACK_DIFFICULTY;
      payload: number;
    };

export type Mode = {
  name: string;
  id: keyof typeof Charset;
  isLocked: boolean;
};
