import React, { useState } from 'react';
import "./style.css"

const RatingQuestion = ({ question, onChange }) => {
  const [isActive, setActive] = useState()
  const handleGetRatting = (id, ratting) => {
    console.log(id, ratting)
    onChange(id, ratting)

  }
  return (
    <div className="container">
      <label>
        <p>3.1</p>
        {question.title}
      </label>
      <label>
        <p>3.2</p>
        {question.subtitle}
      </label>
      <div className="rating-buttons">
        {Array.from({ length: 10 }, (_, index) => index + 1).map((rating) => (
          <button
            className='buttons-container'
            key={rating}
            onClick={() => handleGetRatting(question.id, rating)}
          >
            {rating}
          </button>
        ))}
      </div>
      <div className='button-container'>
        <button className="ok-button" onClick={() => console.log("OK clicked")}>OK</button>
        <span className="press-enter-text">or press Enter</span>
      </div>
    </div>
  );
};

export { RatingQuestion };