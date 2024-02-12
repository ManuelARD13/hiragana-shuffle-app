import React, { useEffect, useRef } from "react";

import { Screen } from "../../models/charsets.model";

interface SoundPlayerProps {
  screen: Screen;
  isAudioAllowed: boolean;
}

function SoundPlayer({ isAudioAllowed, screen }: SoundPlayerProps) {
  const main = require("../../music/Main-Theme.mp3").default;
  const mainTrack = new Audio(main);

  const challenge = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (challenge.current) {
      challenge.current.volume = 0.7;
      console.log(challenge.current.volume);
    }
  }, [challenge.current]);

  return (
    <>
      {screen === Screen.intro || screen === Screen.modeSelector ? (
        <audio src={mainTrack.src} autoPlay muted={!isAudioAllowed} loop />
      ) : null}
      {screen === Screen.start ? (
        <audio
          src={require("../../music/Challenge.mp3").default}
          autoPlay
          muted={!isAudioAllowed}
          loop
          ref={challenge}
        />
      ) : null}
    </>
  );
}

export default SoundPlayer;
