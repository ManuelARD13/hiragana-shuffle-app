import React from 'react';

import Modal from 'common/Modal/Modal';

function GameOverModal() {
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