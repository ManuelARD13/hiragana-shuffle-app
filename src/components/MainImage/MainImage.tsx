import React from "react";

function MainImage({char}: {char: string}) {


  const validateCharLength = (char: string) => {
    const calculateCharLength = () => char.split('').reduce((acc, char) => {
      if(char !== '\u3099' && char !== '\u309a') {
        return acc += 1
      } else {
        return acc += 0
      }
    }, 0);

    const charLength = calculateCharLength();
    if (charLength > 1 && charLength < 3) {
      return "you-on--active"
    } else if(charLength >= 3) {
      return `words--active-${charLength}`
    }
    return ""
  }

  return (
    <div
      className={`main-image flip-in-ver-right ${validateCharLength(char)}`}
      style={{
        backgroundImage: `url(${
          require(`img/papper-pattern.png`).default
        })`
      }}
    >
      <p>{char}</p>
    </div>
  );
}

export default MainImage;
