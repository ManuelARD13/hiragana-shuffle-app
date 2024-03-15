import React from 'react';

import Modal from 'common/Modal/Modal';
import { useAppContext } from 'context/AppContext';
import { GameAction, Screen } from 'models/charsets.model';

function GameOverModal() {
  const { gameDispatch, gameState } = useAppContext();
  const handleClose = () => {
    console.log(gameState)
    // gameDispatch({ type: GameAction.SET_IS_GAME_OVER, payload: false });
    gameDispatch({ type: GameAction.SET_SCREEN, payload: Screen.modeSelector });
    console.log(gameState)
  }
  return (
    <Modal buttonCallback={handleClose} buttonText={"Back to Main Menu"}>
      <div>
        <h1>Game Over</h1>
      </div>
    </Modal>
  );
}

export default GameOverModal;