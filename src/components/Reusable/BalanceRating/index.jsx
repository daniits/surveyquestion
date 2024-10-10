import React from 'react';

const BalanceRating = ({ question, onChange }) => {
  return (
    <div className="question-wrapper">
      <label>{question.title}</label>
      <div className="balance-options">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onChange(question.id, option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export {BalanceRating};
