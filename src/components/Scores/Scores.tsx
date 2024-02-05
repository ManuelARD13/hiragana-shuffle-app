import React, { useEffect, useState } from "react";

interface ScoresProps {
  score: number;
  level: number;
  isGameRunning: boolean;
}

function Scores({ score, level, isGameRunning }: ScoresProps) {
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState("00:00");

  useEffect(() => {
    if (!isGameRunning) {
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
    <div>
      <div className="scores">
        <p>
          SCORE: <span>{score}</span>
        </p>
        <p>
          TIME: <span>{timer}</span>
        </p>
        <p>
          LEVEL: <span>{level}</span>
        </p>
      </div>
    </div>
  );
}

export default Scores;
