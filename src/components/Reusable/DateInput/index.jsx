import React, { useState, useEffect } from 'react';
import InfoTooltip from '../InfoTooltip';
import './style.css';

const DateInput = ({ question, onChange }) => {
  const [date, setDate] = useState({ day: '', month: '', year: '' });
  const [errors, setErrors] = useState({ day: '', month: '', year: '' });
  const [healthAge, setHealthAge] = useState(null);

  const handleChange = (field, value) => {
    setErrors({ ...errors, [field]: '' });
    const updatedDate = { ...date, [field]: value };
    setDate(updatedDate);
  };

  const handleBlur = (field, value) => {
    let errorMessage = '';

    if (value !== '') {
      if (field === 'day' && (value > 31 || value < 1)) {
        errorMessage = 'Between 1 and 31';
      } else if (field === 'month' && (value > 12 || value < 1)) {
        errorMessage = 'Between 1 and 12';
      } else if (field === 'year' && (value > 2006 || value < 1920)) {
        errorMessage = 'Between 1920 and 2006';
      }

      setErrors({ ...errors, [field]: errorMessage });
    }
  };

  const calculateHealthAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob.year, dob.month - 1, dob.day); 
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  useEffect(() => {
    if (date.day && date.month && date.year && !errors.day && !errors.month && !errors.year) {
      const healthAge = calculateHealthAge(date);
      setHealthAge(healthAge);
    }
  }, [date, errors]); 

  const handleSubmit = () => {
    if (!errors.day && !errors.month && !errors.year) {
      const validDate = {
        day: date.day === '' ? 1 : date.day,
        month: date.month === '' ? 1 : date.month,
        year: date.year === '' ? 1920 : date.year,
      };

      onChange(question.id, validDate);
      console.log('Date submitted:', validDate);
    } else {
      console.log('Fix errors before submitting');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="container" onKeyPress={handleKeyPress}>
      <div>
        <label><p>2</p>{question.title}</label>
        <InfoTooltip text={`Your health age is: ${healthAge || 'N/A'}`} /> 
      </div>
      <div className="date-inputs">
        <div className="input-container">
          <label htmlFor="day">Day</label>
          <input
            id="day"
            className="date-input"
            type="number"
            placeholder="DD"
            min="1"
            max="31"
            value={date.day}
            onChange={(e) => handleChange('day', e.target.value)}
            onBlur={(e) => handleBlur('day', e.target.value)}
          />
          {errors.day && <span className="error-message">{errors.day}</span>}
        </div>
        <div className="input-container">
          <label htmlFor="month">Month</label>
          <input
            id="month"
            className="date-input"
            type="number"
            placeholder="MM"
            min="1"
            max="12"
            value={date.month}
            onChange={(e) => handleChange('month', e.target.value)}
            onBlur={(e) => handleBlur('month', e.target.value)}
          />
          {errors.month && <span className="error-message">{errors.month}</span>}
        </div>
        <div className="input-container">
          <label htmlFor="year">Year</label>
          <input
            id="year"
            className="date-input"
            type="number"
            placeholder="YYYY"
            min="1920"
            max="2006"
            value={date.year}
            onChange={(e) => handleChange('year', e.target.value)}
            onBlur={(e) => handleBlur('year', e.target.value)}
          />
          {errors.year && <span className="error-message">{errors.year}</span>}
        </div>
      </div>
      <div className="button-container">
        <button
          className="ok-button"
          onClick={handleSubmit}
          disabled={!!errors.day || !!errors.month || !!errors.year}
        >
          OK
        </button>
        <span className="press-enter-text">or press Enter</span>
      </div>
    </div>
  );
};

export { DateInput };
