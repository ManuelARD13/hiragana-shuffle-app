//React
import React, { useEffect, useRef, useState } from "react";
//Hooks
import { useAppContext } from "context/AppContext";
//Components
import { Screen } from "models/charsets.model";

function SoundPlayer() {
  const { gameState } = useAppContext();

  const [track, setTrack] = useState<HTMLAudioElement | null>(null);

  const challengeTrack = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const main = require("music/Main-Theme.mp3").default;
    const mainTrack = new Audio(main);
    setTrack(mainTrack);
  }, []);
  useEffect(() => {
    if (challengeTrack.current) {
      challengeTrack.current.volume = 0.2;
    }
  }, [challengeTrack.current]);

  return (
    <>
      {gameState.screen !== Screen.start &&
      gameState.screen !== Screen.permissions ? (
        <audio
          src={track?.src}
          autoPlay
          muted={!gameState.isAudioAllowed}
          loop
        />
      ) : null}
      {gameState.screen === Screen.start ? (
        <audio
          src={require("music/Challenge.mp3").default}
          autoPlay
          muted={!gameState.isAudioAllowed}
          loop
          ref={challengeTrack}
        />
      ) : null}
    </>
  );
}

export default SoundPlayer;
