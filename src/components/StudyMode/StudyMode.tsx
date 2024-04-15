//React
import React, { useEffect, useState } from "react";
//Hooks
import { useAppContext } from "context/AppContext";
//Types
import { Charset, GameAction, Screen } from "models/charsets.model";
//Components
import Loader from "common/Loader/Loader";
import CharacterTable from "common/CharacterTable/CharacterTable";
import MayorCharsetSelector from "components/MayorCharsetSelector/MayorCharsetSelector";

interface StudyMode {
  charsetName: Charset;
  title: string;
  description: JSX.Element;
}

const hiraganaStudyModes: StudyMode[] = [
  {
    charsetName: Charset.HIRAGANA,
    title: "Basics",
    description: (
      <>
        <p>
          Primarily used for native Japanese words, verb endings, and
          grammatical particles. It consists of 46 characters representing
          syllables and sounds in the Japanese language
        </p>
        <p>
          Each character represents a combination of a consonant sound (except
          for ん, "n") and a vowel sound or a standalone vowel sound.
        </p>
        <p>
          The Hiragana characters are phonetic and have a simple, flowing
          appearance compared to the more complex Kanji characters.
        </p>
        <p>
          Learning the Hiragana basic set is essential for beginners to
          understand and read Japanese text accurately.
        </p>
        <p>Here, the table with all Hiragana is shown below.</p>
      </>
    ),
  },
  {
    charsetName: Charset.HIRAGANA_TENTEN_MARU,
    title: "Ten Ten & Maru",
    description: (
      <>
        <p>
          By adding two short lines or 'Ten-Ten' to certain hiragana and
          katakana, we can create different sounds.
        </p>
        <p>
          The 'Ten-Ten' or 'Dot-Dot' are drawn in the top right of the character
          space, except where the character itself occupies that space. Example:
          ぐ , ご , で .
        </p>
        <p>
          ふ is romanized to Fu rather than Hu, but still belongs in the h sound
          group, so has a ten-ten alternative.
        </p>
        <p>づ is read as 'Zu' rather than 'Du' and is rather uncommon.</p>
        <p>
          Both じ and ぢ are read as 'Ji', but in practice the former is far
          more common.
        </p>
        <p>
          Although quite uncommon, the ten-ten is somtimes applied to the
          katakana ウ 'U' to make ヴ 'Vu'.
        </p>
        <p>
          In addition to the ten-ten, the 5 'H' sound characters can be altered
          by adding a small circle of 'Maru' in order to create 'P' sounds.
        </p>
        <p>Here, the table with all the ten-ten and maru is shown below.</p>
      </>
    ),
  },
  {
    charsetName: Charset.HIRAGANA_YOUON,
    title: "You-on",
    description: (
      <>
        <p>
          Meaning 'Contracted Sound', is when や , ゆ and よ are drawn half size
          and inserted after other characters to make a combination of the
          sounds.
        </p>
        <p>Here, the table with all the You-on is shown below.</p>
      </>
    ),
  },
  {
    charsetName: Charset.HIRAGANA_CHIISAI,
    title: "Chiisai Tsu",
    description: (
      <>
        <p>
          Or 'little tsu', is a つ drawn roughly half size of a regular tsu,
          which has the effect of doubling the sounds of the consonant that
          follows it.
        </p>
        <p>
          We can think on it as a 'pause' right before the consonant that
          follows it too.
        </p>
        <p>Here, the table with all the Chiisai Tsu is shown below.</p>
      </>
    ),
  },
];

const katakanaStudyModes: StudyMode[] = [
  {
    charsetName: Charset.KATAKANA,
    title: "Basics",
    description: (
      <>
        <p>
          Primarily used for foreign words, loanwords, onomatopoeia, and
          emphasis in Japanese text.
        </p>
        <p>
          Similar to Hiragana, Katakana consists of 46 characters representing
          syllables and sounds in the Japanese language.
        </p>
        <p>
          Katakana characters have a more angular and straight appearance
          compared to the curvy Hiragana characters.
        </p>
        <p>
          Learning the Katakana basic set is crucial for beginners to read and
          write foreign words and phrases in Japanese accurately.
        </p>
        <p>Here, the table with all Katakana is shown below.</p>
      </>
    ),
  },
  {
    charsetName: Charset.KATAKANA_TENTEN_MARU,
    title: "Ten Ten & Maru",
    description: (
      <>
        <p>
          Ten-Ten and Maru variations are similar to Hiragana but use different
          sounds.
        </p>
        <p>
          Katakana characters with ten ten are not as commonly used as their
          unvoiced counterparts in everyday Japanese writing.
        </p>
        <p>
          The maru mark changes voiceless consonants to their voiced nasal
          counterparts, creating pairs like Ka カ and Ga ガ, Ki キ and Gi ギ,
          etc.
        </p>
      </>
    ),
  },
  {
    charsetName: Charset.KATAKANA_YOUON,
    title: "You-on",
    description: (
      <>
        <p>
          Meaning 'Contracted Sound', is when ヤ , ユ and ヨ are drawn half size
          and inserted after other characters to make a combination of the
          sounds.
        </p>
        <p>Here, the table with all the You-on is shown below.</p>
      </>
    ),
  },
];

function StudyMode() {
  const { charSet, gameState, setCharsetName, isLoading, gameDispatch } =
    useAppContext();

  const [studyModes, setStudyModes] = useState(hiraganaStudyModes);
  const [buttonIndexes, setButtonIndexes] = useState({
    start: 0,
    end: 1,
  });

  useEffect(() => {
    if (gameState.mayorCharset === Charset.HIRAGANA) {
      setStudyModes(hiraganaStudyModes);
      setCharsetName(Charset.HIRAGANA);
    } else {
      setStudyModes(katakanaStudyModes);
      setCharsetName(Charset.KATAKANA);
    }
  }, [gameState.mayorCharset]);

  const handleNext = (index: number) => {
    if (buttonIndexes.end < studyModes.length) {
      setCharsetName(studyModes[index].charsetName);
      if (index < 2) {
        setButtonIndexes({
          start: buttonIndexes.start,
          end: buttonIndexes.end + 1,
        });
      } else {
        setButtonIndexes({
          start: buttonIndexes.start + 1,
          end: buttonIndexes.end + 1,
        });
      }
    } else {
      gameDispatch({
        type: GameAction.SET_SCREEN,
        payload: Screen.modeSelector,
      });
    }
  };

  const handlePrev = (index: number) => {
    if (buttonIndexes.start > 0) {
      setCharsetName(studyModes[index].charsetName);
      if (buttonIndexes.end > 2) {
        setButtonIndexes({
          start: buttonIndexes.start - 1,
          end: buttonIndexes.end - 1,
        });
      } else {
        setButtonIndexes({
          start: 0,
          end: 1,
        });
      }
    } else {
      gameDispatch({
        type: GameAction.SET_SCREEN,
        payload: Screen.modeSelector,
      });
    }
  };

  return (
    <>
      {gameState.screen === Screen.study ? (
        <MayorCharsetSelector screen={Screen.characterTable} />
      ) : null}

      {gameState.screen === Screen.characterTable ? (
        <>
          {isLoading ? <Loader /> : null}
          <section className="study-mode">
            <h1 className="study-mode__title">
              {studyModes[buttonIndexes.end - 1].title}
            </h1>
            <div className="study-mode__description">
              {studyModes[buttonIndexes.end - 1].description}
            </div>
            <CharacterTable charSet={charSet} />
            <div className="study-mode__btn--container">
              <button onClick={() => handlePrev(buttonIndexes.start)}>
                {buttonIndexes.end === 1
                  ? "Exit"
                  : studyModes[buttonIndexes.start].title}
              </button>
              <button onClick={() => handleNext(buttonIndexes.end)}>
                {buttonIndexes.end === studyModes.length
                  ? "Finish"
                  : studyModes[buttonIndexes.end].title}
              </button>
            </div>
          </section>
        </>
      ) : null}
    </>
  );
}

export default StudyMode;
