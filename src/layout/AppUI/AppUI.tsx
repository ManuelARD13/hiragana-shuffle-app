//React
import React, { useState, useEffect } from "react";
//Hooks
import { useAppContext } from "context/AppContext";
// Types
import { Screen, GameAction, GameModes } from "models/charsets.model";
// Components
import StartModal from "components/StartModal/StartModal";
import PermissionsModal from "components/PermissionsModal/PermissionsModal";
import GameOverModal from "components/GameOverModal/GameOverModal";
import InputLayout from "layout/InputLayout/InputLayout";
import SoundPlayer from "common/SoundPlayer/SoundPlayer";
import Loader from "common/Loader/Loader";
import GameModeSelector from "components/GameModeSelector/GameModesSelector";
import CharsetSelector from "components/CharsetSelector/CharsetSelector";
import MayorCharsetSelector from "components/MayorCharsetSelector/MayorCharsetSelector";
import StudyMode from "components/StudyMode/StudyMode";

function AppUI() {
  const { gameState, gameDispatch } = useAppContext();

  const [backgroundImage, setBackgroundImage] = useState<string>("");

  useEffect(() => {
    if (gameState.screen === Screen.start) {
      gameDispatch({ type: GameAction.SET_IS_GAME_LOADING, payload: true });
      const backgroundImages = [
        require("img/temple-day-bk.jpg").default,
        require("img/night-jp-bk.jpg").default,
        require("img/school-day-bk.jpg").default,
        require("img/street-day-bk.jpg").default,
      ];
      const randomIndex = Math.floor(Math.random() * backgroundImages.length);
      const image = new Image();
      image.onload = () => {
        gameDispatch({ type: GameAction.SET_IS_GAME_LOADING, payload: false });
      };
      image.src = backgroundImages[randomIndex];
      setBackgroundImage(image.src);
    }
  }, [gameState.screen]);

  const getGameModeTitle = () => {
    switch (gameState.gameMode) {
      case GameModes.timeTrial:
        return "Time Trial";
      case GameModes.study:
        return "Let's Study!";
      case GameModes.practice:
        return "Practice Mode";
      case GameModes.survival:
        return "Survival Mode";
      default:
        return "Hiragana Shuffle";
    }
  };

  return (
    <>
      <SoundPlayer />
      {gameState.isGameLoading && <Loader />}
      {gameState.screen === Screen.permissions ? <PermissionsModal /> : null}
      {gameState.screen === Screen.intro ? <StartModal /> : null}
      {gameState.screen === Screen.modeSelector ? <GameModeSelector /> : null}
      {gameState.screen === Screen.mayorCharsetSelector && gameState.gameMode !== GameModes.study ? (
        <MayorCharsetSelector screen={Screen.charsetSelector} />
      ) : null}
      {gameState.screen === Screen.charsetSelector ? <CharsetSelector /> : null}
      {gameState.screen === Screen.study ||
      gameState.screen === Screen.characterTable ? (
        <StudyMode />
      ) : null}

      {gameState.isGameRunning ? (
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
              <h1>{getGameModeTitle()}</h1>
            </div>
          </div>

          <InputLayout />
        </main>
      ) : null}
      {
        //TODO: Finish GameOverModal design and return to main menu functionality
      }
      {gameState.isGameOver ? <GameOverModal /> : null}
    </>
  );
}

export default AppUI;
