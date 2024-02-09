export interface JPChar {
  character: string,
  romaji: string
  score?: number
}

export enum ActionTypes {
  SET_HIRAGANA = "SET_HIRAGANA",
  SET_KATAKANA = "SET_KATAKANA",
  SET_HIRAGANA_AND_KATAKANA = "SET_HIRAGANA_AND_KATAKANA",
  SET_HIRAGANA_2 = "SET_HIRAGANA_2",
  SET_KATAKANA_2 = "SET_KATAKANA_2",
  SET_HIRAGANA_AND_KATAKANA_FULL = "SET_HIRAGANA_AND_KATAKANA_FULL",
  SET_HIRAGANA_WORDS = "SET_HIRAGANA_WORDS",
  SET_KATAKANA_WORDS = "SET_KATAKANA_WORDS",
  SET_HIRAGANA_SPECIAL = "SET_HIRAGANA_SPECIAL",
  SET_KATAKANA_SPECIAL = "SET_KATAKANA_SPECIAL",
}

export enum Screen {
  start = "start",
  modeSelector = "mode_selector",
  intro = "intro",
  permissions = "permissions",
}