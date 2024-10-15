import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BalanceRating, DateInput, DropdownQuestion, RatingQuestion, TextInput } from 'components/Reusable';

const Survey = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});

  console.log(responses)

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

    // Automatically move to the next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    console.log('Responses:', responses);
    // You can add functionality to save responses or trigger an action on submission.
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
      {renderQuestion()}
    </div>
  );
};

export { Survey };
