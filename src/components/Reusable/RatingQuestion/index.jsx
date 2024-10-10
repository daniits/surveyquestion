import React from 'react';

const RatingQuestion = ({ question, onChange }) => {
  return (
    <div className="question-wrapper">
      <label>{question.title}</label>
      <div className="rating-buttons">
        {Array.from({ length: 10 }, (_, index) => index + 1).map((rating) => (
          <button
            key={rating}
            onClick={() => onChange(question.id, rating)}
          >
            {rating}
          </button>
        ))}
      </div>
    </div>
  );
};

export {RatingQuestion};