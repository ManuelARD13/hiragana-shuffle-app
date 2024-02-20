import React, { useState, useEffect, useReducer } from "react";

import { JPChar, Screen } from "../../models/charsets.model";

import MainImage from "../../components/MainImage/MainImage";
import StartModal from "../../components/StartModal/StartModal";
import PermissionsModal from "../../components/PermissionsModal/PermissionsModal";
import GameOverModal from "../../components/GameOverModal/GameOverModal";
import InputLayout from "../InputLayout/InputLayout";
import ModeSelector from "../../components/ModeSelector/ModeSelector";
import SoundPlayer from "../../common/SoundPlayer/SoundPlayer";
import Loader from "../../common/Loader/Loader";
import { useAppContext } from "../../context/AppContext";

function AppUI() {
  const { charSet } = useAppContext();
  
  const [char, setChar] = useState<JPChar>({
    character: "",
    romaji: "",
  });
  
  const [screen, setScreen] = useState<Screen>(Screen.permissions);
  const [isAudioAllowed, setIsAudioAllowed] = useState<boolean>(true);

  const [gameCharset, setGameCharset] = useState<JPChar[] | null>(
    null
  );
  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  const randomChar = (charset: JPChar[]): void => {
    if (charset.length > 0) {
      const randomChar = charset[Math.floor(Math.random() * charset.length)];
      setChar(randomChar);
    } else {
      setChar({ character: "", romaji: "" });
    }
  };

  const updateGameCharset = (): void => {
    if (gameCharset) {
      if (gameCharset.length >= 1) {
        const newCharset = gameCharset?.filter(
          (character) => char.romaji !== character.romaji
        );
        setGameCharset(newCharset);
   
        if (newCharset.length === 0) {
          setIsGameRunning(false);
          setIsGameOver(true);
        }
      }
    }
  };

  useEffect(() => {
    if(gameCharset){randomChar(gameCharset);} 
  }, [gameCharset])

  useEffect(() => {
    if(screen === Screen.start){
      setIsLoading(true)
      const backgroundImages = [
      require("../../img/temple-day-bk.jpg").default,
      require("../../img/night-jp-bk.jpg").default,
      require("../../img/school-day-bk.jpg").default,
      require("../../img/street-day-bk.jpg").default,
    ];
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    const image = new Image();
    image.onload = () => {
      setIsLoading(false)
    }
    image.src = backgroundImages[randomIndex];
    setBackgroundImage(image.src);}
  }, [screen]);

  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  

  return (
    <>
    { isLoading && <Loader />}
      <SoundPlayer screen={screen} isAudioAllowed={isAudioAllowed} />
      {screen === Screen.permissions ? (
        <PermissionsModal
          buttonCallback={() => setScreen(Screen.intro)}
          setAudioAllowed={setIsAudioAllowed}
        />
      ) : null}
      {screen === Screen.intro ? (
        <StartModal setScreen={setScreen} setIsLoading={setIsLoading} />
      ) : null}
      {screen === Screen.modeSelector ? (
        <ModeSelector
          buttonCallback={setScreen}
          setIsGameRunning={setIsGameRunning}
          setGameCharset={() => {
            console.log(charSet)
            if(charSet?.length! > 0){
              setGameCharset(charSet)
            }
          }}
        />
      ) : null}

      {isGameRunning ? (
        <main
          className="main"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="overlay"></div>
          <div className="main__header">
            <div className="logo-icon">
              <p>大</p>
            </div>
            <div className="main__header-title">
              <h1>Game Mode Title</h1>
            </div>
          </div>
          <MainImage char={char.character} />
          <InputLayout
            char={char}
            updateGameCharset={updateGameCharset}
            isGameRunning={isGameRunning}
          />
        </main>
      ) : null}
      {isGameOver ? <GameOverModal /> : null}
    </>
  );
}

export default AppUI;
