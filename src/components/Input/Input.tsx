import React, { useState } from 'react';

function Input() {
  const [ input, setInput ] = useState("");
  const [ answer, setAnswer ] = useState("");
  
  const handleSubmit = () => {
    if (input) {
      setAnswer(input);
    }
  }

  return (
    <div>
      <input type="text" onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Input;