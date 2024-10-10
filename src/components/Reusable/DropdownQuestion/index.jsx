// src/components/DropdownQuestion.js
import React from 'react';

const DropdownQuestion = ({ question, onChange }) => {
  const handleChange = (e) => {
    onChange(question.id, e.target.value);
  };

  return (
    <div className="question-wrapper">
      <label>{question.title}</label>
      <select onChange={handleChange}>
        <option value="">Select...</option>
        {question.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export {DropdownQuestion};
