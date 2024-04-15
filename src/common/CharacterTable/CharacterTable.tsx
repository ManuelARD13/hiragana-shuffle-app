//React
import React, { useEffect, useState } from "react";
//Hooks
import { useAppContext } from "context/AppContext";
//Types
import { JPChar } from "models/charsets.model";
//Components
import Loader from "common/Loader/Loader";

function CharacterTable({ charSet }: { charSet: JPChar[] | null }) {
  const { isLoading, charsetName, gameState } = useAppContext();

  const [currentCharset, setCurrentCharset] = useState([
    {
      character: "",
      romaji: "",
    },
  ]);
  const [sliceIndexes, setSliceIndexes] = useState({
    start: 0,
    end: 10,
  });

  useEffect(() => {
    setSliceIndexes({
      start: 0,
      end: 10,
    });
  }, [charsetName]);

  useEffect(() => {
    if (charSet) {
      setCurrentCharset(charSet.slice(sliceIndexes.start, sliceIndexes.end));
    }
  }, [charSet]);

  const goToNext = () => {
    const newSliceIndexes = {
      start: sliceIndexes.start + 10,
      end: sliceIndexes.end + 10,
    };
    if (charSet && sliceIndexes.end < charSet.length) {
      setCurrentCharset(
        charSet.slice(newSliceIndexes.start, newSliceIndexes.end)
      );
      setSliceIndexes(newSliceIndexes);
    }
  };

  const goBackPrev = () => {
    const newSliceIndexes = {
      start: sliceIndexes.start - 10,
      end: sliceIndexes.end - 10,
    };
    if (charSet && sliceIndexes.start >= 10) {
      setCurrentCharset(
        charSet.slice(newSliceIndexes.start, newSliceIndexes.end)
      );
      setSliceIndexes(newSliceIndexes);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <>
        <table className="character-table">
          <thead>
            <tr className="character-table__row">
              <th className="character-table__header">
                {gameState.mayorCharset}
              </th>
              <th className="character-table__header">Romaji</th>
            </tr>
          </thead>
          <tbody className="character-table__body">
            {currentCharset.map((char) => (
              <tr key={char.romaji} className="character-table__row">
                <td className="character-table__cell">{char.character}</td>
                <td className="character-table__cell">{char.romaji}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="character-table__btn--container">
          {sliceIndexes.start > 0 ? (
            <button onClick={goBackPrev}>Prev</button>
          ) : null}
          {charSet && sliceIndexes.end < charSet.length ? (
            <button onClick={goToNext}>Next</button>
          ) : null}
        </div>
      </>
    </>
  );
}

export default CharacterTable;
