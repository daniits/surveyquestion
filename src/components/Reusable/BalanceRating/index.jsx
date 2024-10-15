import React, { useState } from 'react';
import "./style.css";

const BalanceRating = ({ question, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track if submission is done

  const handleClick = (option) => {
    setSelectedOption(option);
    onChange(question.id, option);
  };

  const handleSubmit = () => {
    if (!selectedOption) {
      console.log("Please select an option before proceeding.");
      return; // Do not proceed if no option is selected
    }
    
    // Set the submission state to true
    setIsSubmitted(true);
    console.log("Selected option submitted:", selectedOption);
  };

  const handleKeyPress = (event, option) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick(option); // Trigger selection with Enter or Space key
    }
  };

  const optionLabels = ['A', 'B', 'C', 'D', 'E'];

  // If the form has been submitted, show the thank you message
  if (isSubmitted) {
    return (
      <div className="thank-you-screen">
        <h2>Thanks for submitting!</h2>
        <p>Your response has been submitted.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <label>
        <p>5</p>
        {question.title}
      </label>
      <div className="balance-options">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`balance-option ${selectedOption === option ? 'selected' : ''}`}
            onClick={() => handleClick(option)}
            onKeyPress={(event) => handleKeyPress(event, option)} // Handle keypress for accessibility
            tabIndex={0} // Make it focusable for keyboard users
          >
            <span className="option-label">{optionLabels[index]}</span>
            {option}
          </button>
        ))}
      </div>
      <div className='button-container'>
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export { BalanceRating };
