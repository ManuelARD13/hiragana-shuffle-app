import React from "react";

function MainImage({ char }: { char: string }) {
  console.log(char, char.length)
  return (
    <div
      className={`main-image flip-in-ver-right ${char.length > 1 && char.length < 4 ? "you-on--active": ""}`}
      style={{
        backgroundImage: `url(${
          require(`../../img/papper-pattern.png`).default
        })`
      }}
    >
      <p>{char}</p>
    </div>
  );
}

export default MainImage;
