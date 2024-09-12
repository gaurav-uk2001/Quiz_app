import React, { useState, useEffect } from 'react';
import Question from './Question';

function QuizPlayer({ quiz, setQuiz }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  useEffect(() => {
    if (quiz) {
      setTimeRemaining(quiz.questions[currentQuestionIndex]?.timer || 0);
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev === 1) {
            clearInterval(timer);
            handleNextQuestion();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      setTimerInterval(timer);

      return () => clearInterval(timer);
    }
  }, [currentQuestionIndex, quiz]);

  const handleAnswerChange = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(prev => prev - 1);
  };

  const handleSubmit = () => {
    clearInterval(timerInterval);
    const score = quiz.questions.reduce((acc, q, i) => {
      if (answers[i] === q.correct) return acc + 1;
      return acc;
    }, 0);
    alert(`Your score is ${score}/${quiz.questions.length}`);
    setQuiz(null); // Reset the quiz
  };

  useEffect(() => {
    if (quiz && quiz.questions.length > 0) {
      setTimeRemaining(quiz.questions[currentQuestionIndex]?.timer || 0);
    }
  }, [currentQuestionIndex, quiz]);

  return (
    <div>
      <h2>{quiz.title}</h2>
      <p>Time Remaining: {timeRemaining}s</p>
      <Question
        question={quiz.questions[currentQuestionIndex]}
        onAnswerChange={handleAnswerChange}
      />
      <button
        disabled={currentQuestionIndex === 0}
        onClick={handlePreviousQuestion}
      >
        Previous
      </button>
      <button
        disabled={currentQuestionIndex === quiz.questions.length - 1}
        onClick={handleNextQuestion}
      >
        Next
      </button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default QuizPlayer;
