import { useEffect, useState } from "react";

import { endPoints } from "services/api";

import { GameCharset, type JPChar } from "models/charsets.model";

export const useGameData = (charsetName: string) => {
  const [charSet, setCharset] = useState<JPChar[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [gameLogic, setGameLogic] = useState<GameCharset>({
    charset: [],
    updateCharset: (char: JPChar): boolean => {
      return true;
    },
    getRandomCharacter: (): JPChar => {
      return {
        character: "",
        romaji: "",
      };
    },
  });

  useEffect(() => {
    const API = process.env.REACT_APP_X_MASTER_KEY;
    const fetchData = async () => {
      const response = await fetch(endPoints(charsetName), {
        headers: {
          "X-Master-Key": `${API}`,
        },
      });

      const data = await response.json();
      const newCharset = Object.keys(data.record)[0];

      setCharset(data.record[newCharset]);
    };
    fetchData().then(() => setIsLoading(false));
  }, [charsetName]);

  useEffect(() => {
    if (charSet) {
      const gameLogic: GameCharset = new GameCharset(charSet);
      setGameLogic(gameLogic);
    }
  }, [charSet]);

  return { charSet, isLoading, error, gameLogic };
};
