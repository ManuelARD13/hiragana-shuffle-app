import React, { useState } from 'react';

type InputProps = {
  validateAnswer: (input: string) => boolean
}

function Input({validateAnswer }: InputProps) {

  const [ input, setInput ] = useState<string>("");
  
  const handleSubmit = (): void => {
    validateAnswer(input);
    location.reload();
  }

  return (
    <div>
      <input type="text" onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Input;