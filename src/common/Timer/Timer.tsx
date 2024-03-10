//React
import React, { useEffect, useState } from "react";
//Hooks
import { useAppContext } from "context/AppContext";
//Types
import { GameAction, GameModes } from "models/charsets.model";


function Timer({ timerCallback, startTime }: { timerCallback: () => void, startTime: number }) {
 
  const [time, setTime] = useState<number>(startTime);
  const [timer, setTimer] = useState<string>("");

  useEffect(() => {
   
      let timer: NodeJS.Timeout;
      if(time > 0){
        timer = setInterval(() => {
          setTime((time) => time - 1);
        }, 1000);
      } else {
        setTimer("00:00");
        timerCallback();
      }
      toTime(time);

      return () => {
        clearInterval(timer);
      };
   
  }, [time]);

  const toTime = (time: number) => {
    var date = new Date("January 1, 1970 00:00");
    date.setSeconds(time);
    setTimer(date.toLocaleTimeString().substring(2, 7));
  };
  return (
    <div>
      <p>{timer}</p>
    </div>
  );
}

export default Timer;
