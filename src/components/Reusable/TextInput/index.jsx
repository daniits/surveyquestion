import React, { useState } from 'react';
import InfoTooltip from '../InfoTooltip';

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
    <div className="question-wrapper">
      <label>{question.title}</label>
      <InfoTooltip text={question.info} />
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Type your answer here..."
        maxLength={250}
      />
      <div>{text.length}/250</div>
    </div>
  );
};

export  {TextInput};
