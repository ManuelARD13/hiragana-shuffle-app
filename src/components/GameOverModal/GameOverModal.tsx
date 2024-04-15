import React, { useEffect } from 'react';

import Modal from 'common/Modal/Modal';
import { useAppContext } from 'context/AppContext';
import { GameAction, Screen } from 'models/charsets.model';

function GameOverModal() {
  const { gameDispatch } = useAppContext();
  const handleClose = () => {
    gameDispatch({ type: GameAction.SET_SCREEN, payload: Screen.modeSelector });
  }

  return (
    <Modal
      className='game-over'
      buttonClassName='game-over__btn' 
      buttonCallback={handleClose} 
      buttonText={"Back to Main Menu"}
      modalBackground='day-jp-bk.jpg'
    >
      <div className="game-over__container">
        <h1>Game Over</h1>
        <h2>ゲームオーバー</h2>
      </div>
    </Modal>
  );
}

export default GameOverModal;