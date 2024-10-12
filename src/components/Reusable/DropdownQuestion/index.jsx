
import React from 'react';
import "./style.css";

const DropdownQuestion = ({ question, onChange }) => {
  console.log(question)
  const handleChange = (e) => {
    onChange(question.id, e.target.value);
  };

  return (
    <div className="container">
      <label>
        <p>1</p>
        {question.title}
      </label>
      <div className="container_dropdown_wrapper">
        <select className="container_dropdown" onChange={handleChange}>
          <option value="">Select...</option>
          {question.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="line"></div> {/* This is the line next to the arrow */}
      </div>


    </div>
  );
};

export { DropdownQuestion };
