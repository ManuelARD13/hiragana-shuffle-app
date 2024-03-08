import React, { useEffect, useState } from "react";
import { useAppContext } from "context/AppContext";

interface ScoresProps {
  score: number;
  level: number;
}

function Scores({ score, level }: ScoresProps) {

  const { gameState } = useAppContext();

  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState("00:00");

  useEffect(() => {
    if (!gameState.isGameRunning) {
      setTime(0);
    }
    const timeout = setTimeout(() => {
      setTime((t) => t + 1);
    }, 1000);

    toTime(time);

    return () => {
      clearTimeout(timeout);
    };
  }, [time]);

  const toTime = (time: number) => {
    var date = new Date("January 1, 1970 00:00");
    date.setSeconds(time);
    setTimer(date.toLocaleTimeString().substring(2, 7));
  };

  return (
    <>
      <div className="scores">
        <p>
          SCORE <span>{score}</span>
        </p>
        <p>
          TIME <span>{timer}</span>
        </p>
      </div>
    </>
  );
}

export default Scores;
