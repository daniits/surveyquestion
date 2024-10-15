import React, { useState } from 'react';
import InfoTooltip from '../InfoTooltip';
import "./style.css"

const TextInput = ({ question, onChange }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 250) {
      setText(value);
      setError(false);
    }
  };

  const handleSubmit = () => {
    if (text.trim() === '') {
      setError(true); 
      console.log("Text is empty. Please provide an answer before submitting.");
      return; 
    }
    
    onChange(question.id, text);
    console.log("Text submitted:", text);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      handleSubmit(); 
    }
  };

  return (
    <div className="container" onKeyPress={handleKeyPress}>
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
      <div className='text-lenght'>{text.length}/250</div>
      {error && <div className="error-message" style={{width : "100%"}}>Text is required before submitting.</div>} 
      <div className='button-container'>
        <button className="ok-button" onClick={handleSubmit}>OK</button>
        <span className="press-enter-text">or press Enter</span>
      </div>
    </div>
  );
};

export { TextInput };
