//React
import React from "react";
//Hooks
import { useAppContext } from "context/AppContext";
//Types
import { GameAction, GameModes } from "models/charsets.model";
//Components
import Timer from "common/Timer/Timer";

interface ScoresProps {
  score: number;
}

function Scores({ score }: ScoresProps) {
  const { gameState, gameDispatch } = useAppContext();

  return (
    <>
      <div className="scores">
        <p>
          SCORE <span>{score}</span>
        </p>
        {gameState.gameMode === GameModes.timeTrial ? (
          <Timer
            timerCallback={() => {
              gameDispatch({ type: GameAction.SET_IS_GAME_RUNNING, payload: false })
              gameDispatch({ type: GameAction.SET_IS_GAME_OVER, payload: true })
            }
            }
            startTime={315 - gameState.timeAttackDifficulty * 15}
          />
        ) : null}
      </div>
    </>
  );
}

export default Scores;
