import React from 'react';


function MainImage({ char }: {
  char: string
}) {

  return (
    <div className='main-image'>
      <p>
        {char}
      </p>
    </div>
  );
}

export default MainImage;