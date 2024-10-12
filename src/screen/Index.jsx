// src/screens/Survey.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BalanceRating, DateInput, DropdownQuestion, RatingQuestion, TextInput } from 'components/Reusable';

const Survey = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    axios.get('/surveyData.json')
      .then((res) => {
        setQuestions(res.data.questions);
      })
      .catch((error) => {
        console.error('Error fetching survey data:', error);
      });
  }, []);

  const handleResponseChange = (questionId, value) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Responses:', responses);
  };

  const renderQuestion = () => {
    const question = questions[currentQuestionIndex];
    if (!question) return null;

    switch (question.type) {
      case 'dropdown':
        return (
          <DropdownQuestion
            question={question}
            onChange={handleResponseChange}
          />
        );
      case 'date':
        return (
          <DateInput
            question={question}
            onChange={handleResponseChange}
          />
        );
      case 'rating':
        return (
          <RatingQuestion
            question={question}
            onChange={handleResponseChange}
          />
        );
      case 'text':
        return (
          <TextInput
            question={question}
            onChange={handleResponseChange}
          />
        );
      case 'balance':
        return (
          <BalanceRating
            question={question}
            onChange={handleResponseChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="survey-container">
      {/* <h1>Survey</h1> */}
      {renderQuestion()}
      <div className="navigation-buttons">
        {currentQuestionIndex > 0 && (
          <button onClick={handleBack}>Back</button>
        )}
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

export { Survey };
