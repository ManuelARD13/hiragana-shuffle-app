import React from 'react';


function MainImage({ char }: {
  char: string
}) {

  return (
    <div className='main-image flip-in-ver-right' style={{backgroundImage: `url(${require(`../../img/papper-pattern.png`).default})`}}>
      <p>
        {char}
      </p>
    </div>
  );
}

export default MainImage;