import React from 'react';

import { Screen } from '../../models/charsets.model';

interface SoundPlayerProps {
  screen: Screen;
  isAudioAllowed: boolean;
}

function SoundPlayer({ isAudioAllowed, screen }: SoundPlayerProps) {

  const mainTheme = require("../../music/Main-Theme.mp3").default;

  return (
    <>
    {
      screen === Screen.intro || screen === Screen.modeSelector ? <audio src={mainTheme} autoPlay muted={!isAudioAllowed} loop /> : null
    }
      
    </>
  );
}

export default SoundPlayer;