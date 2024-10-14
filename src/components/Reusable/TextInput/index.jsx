import React, { useState } from 'react';
import InfoTooltip from '../InfoTooltip';
import "./style.css"

const TextInput = ({ question, onChange }) => {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 250) {
      setText(value);
      onChange(question.id, value);
    }
  };

  return (
    <div className="container">
      <div>
        <label><p>4</p>{question.title}</label>
        <InfoTooltip text={question.info} />
      </div>
      <textarea
        value={text}
        className='text-input'
        onChange={handleChange}
        placeholder="Type your answer here..."
        maxLength={250}
      />
      <div>{text.length}/250</div>
      <div className='button-container'>
        <button className="ok-button" onClick={() => console.log("OK clicked")}>OK</button>
        <span className="press-enter-text">or press Enter</span>
      </div>
    </div>
  );
};

export { TextInput };
