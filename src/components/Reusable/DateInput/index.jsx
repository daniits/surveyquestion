import React, { useState } from 'react'
import InfoTooltip from '../InfoTooltip';
import "./style.css"
const DateInput = ({ question, onChange }) => {
  const [date, setDate] = useState({ day: '', month: '', year: '' });

  const handleChange = (field, value) => {
    const updatedDate = { ...date, [field]: value };
    setDate(updatedDate);
    onChange(question.id, updatedDate);
  }
  return (
    <div className="container">
      <div>
        <label><p>2</p>{question.title}</label>
        <InfoTooltip text={question.info} />
      </div>
      <div className="date-inputs">
        <input
          type="number"
          placeholder="DD"
          min="1"
          max="31"
          value={date.day}
          onChange={(e) => handleChange('day', e.target.value)}
        />
        <input
          type="number"
          placeholder="MM"
          min="1"
          max="12"
          value={date.month}
          onChange={(e) => handleChange('month', e.target.value)}
        />
        <input
          type="number"
          placeholder="YYYY"
          min="1920"
          max="2006"
          value={date.year}
          onChange={(e) => handleChange('year', e.target.value)}
        />
      </div>
    </div>
  )
}

export { DateInput }