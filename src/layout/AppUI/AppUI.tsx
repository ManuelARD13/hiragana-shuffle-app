import React, { useState, useEffect } from "react";

// Enums
import { Screen } from "../../models/charsets.model";

// Components
import StartModal from "../../components/StartModal/StartModal";
import PermissionsModal from "../../components/PermissionsModal/PermissionsModal";
import GameOverModal from "../../components/GameOverModal/GameOverModal";
import InputLayout from "../InputLayout/InputLayout";
import ModeSelector from "../../components/ModeSelector/ModeSelector";
import SoundPlayer from "../../common/SoundPlayer/SoundPlayer";
import Loader from "../../common/Loader/Loader";


function AppUI() {
  //TODO: group all the game states in one reducer
  const [screen, setScreen] = useState<Screen>(Screen.permissions);
  const [isAudioAllowed, setIsAudioAllowed] = useState<boolean>(true);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);


  const [backgroundImage, setBackgroundImage] = useState<string>("");

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
        />
      ) : null}

      {isGameRunning ? (
       
        <main
          className="main"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="overlay"></div>
          {
            // TODO: Create Header component
          }
          <div className="main__header">
            <div className="logo-icon">
              <p>大</p>
            </div>
            <div className="main__header-title">
              <h1>Game Mode Title</h1>
            </div>
          </div>
          
          <InputLayout
            setIsGameRunning={setIsGameRunning}
            setIsGameOver={setIsGameOver}
            isGameRunning={isGameRunning}
          >
          </InputLayout>
        </main>
      ) : null}
      {
        //TODO: Finish GameOverModal design and return to main menu functionality
      }
      {isGameOver ? <GameOverModal /> : null}
    </>
  );
}

export default AppUI;
