import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BalanceRating, DateInput, DropdownQuestion, RatingQuestion, TextInput } from 'components/Reusable';

const Survey = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  console.log(surveyCompleted)

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

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setSurveyCompleted(true);
    }
  };

  const handleSubmit = () => {
    const jsonString = JSON.stringify(responses, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'responses.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderQuestion = () => {
    const question = questions[currentQuestionIndex];
    if (!question) return null;

    switch (question.type) {
      case 'dropdown':
        return <DropdownQuestion question={question} onChange={handleResponseChange} />;
      case 'date':
        return <DateInput question={question} onChange={handleResponseChange} />;
      case 'rating':
        return <RatingQuestion question={question} onChange={handleResponseChange} />;
      case 'text':
        return <TextInput question={question} onChange={handleResponseChange} />;
      case 'balance':
        return <BalanceRating question={question} onChange={handleResponseChange} submitForm={handleSubmit} />;
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
