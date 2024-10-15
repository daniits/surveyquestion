import React, { useState } from 'react';
import "./style.css";

const RatingQuestion = ({ question, onChange }) => {
  const [activeRating, setActiveRating] = useState(null); // Store active rating

  const handleGetRating = (id, rating) => {
    setActiveRating(rating);  // Set the active rating
  };

  const handleSubmit = () => {
    if (activeRating === null) {
      console.log("No rating selected. Please select a rating before submitting.");
      return; // Prevent submission if no rating is selected
    }

    // Submit the selected rating and proceed to the next step
    onChange(question.id, activeRating);
    console.log('Rating submitted:', activeRating);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(); // Trigger submission on Enter key press
    }
  };

  return (
    <div className="container" onKeyPress={handleKeyPress}>
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
            className={`buttons-container ${activeRating === rating ? 'active' : ''}`} // Apply active class to selected rating
            key={rating}
            onClick={() => handleGetRating(question.id, rating)}
          >
            {rating}
          </button>
        ))}
      </div>
      <div className='button-container'>
        <button className="ok-button" onClick={handleSubmit}>OK</button>
        <span className="press-enter-text">or press Enter</span>
      </div>
    </div>
  );
};

export { RatingQuestion };
