import React, { useRef, useState } from 'react';
import './CodeInput.css';

type Props = {
    onComplete: (code: string) => void;
  };

//Tento komponent bol vygenerovaný pomocou ChatGPT
const CodeInput = ({ onComplete } : Props) => {
  const [values, setValues] = useState(Array(6).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^0-9]/g, '');
    if (newValue.length > 1) return;

    const newValues = [...values];
    newValues[index] = newValue;
    setValues(newValues);

    if (newValue && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newValues.every((val) => val !== '')) {
      onComplete(newValues.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="code-input-container">
      {values.map((val, idx) => (
        <input
          key={idx}
          type="text"
          maxLength={1}
          value={val}
          onChange={(e) => handleChange(idx, e)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          ref={(el) => (inputsRef.current[idx] = el)}
          className="code-input"
        />
      ))}
    </div>
  );
};

export default CodeInput;
