import React from 'react';

import Modal from '../../common/Modal/Modal';

function GameOverModal({ setIsGameOver, setScreen }: { setIsGameOver: (value: boolean) => void, setScreen: (value: string) => void }) {
  const handleClose = () => {
    window.location.reload();
  }
  return (
    <Modal buttonCallback={handleClose} buttonText={"Play Again"}>
      <div>
        <h1>Game Over</h1>
      </div>
    </Modal>
  );
}

export default GameOverModal;