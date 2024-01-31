import React from 'react';


function MainImage({ char }: {
  char: {0: string, 1: string}
}) {

  return (
    <div className='main-image'>
      <p>
        {char[1]}
      </p>
    </div>
  );
}

export default MainImage;