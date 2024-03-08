import React from 'react';

function Loader() {

  setInterval(() => {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot) => {
      dot.classList.remove("scale-up-center");
      setTimeout(() => {
        dot.classList.add("scale-up-center");
      },500)
    })
  }, 3000)

  return (
    <div className='loader'>
      <div className='loader__footer'>
        <div className='loader__footer-icon'>
          <img src={require("img/hiragana-shuffle-logo-removebg-preview.png").default} alt="hiragana-shuffle-logo" />
        </div>
        <div className="loader__footer-dots">
          <div className="dot scale-up-center"></div>
          <div className="dot scale-up-center"></div>
          <div className="dot scale-up-center"></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;