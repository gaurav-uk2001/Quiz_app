import React from 'react';

function Question({ question, onAnswerChange }) {
  const handleOptionChange = (event) => {
    onAnswerChange(parseInt(event.target.value));
  };

  return (
    <div>
      <h3>{question.question}</h3>
      {question.options.map((o, i) => (
        <div key={i}>
          <input
            type="radio"
            name="answer"
            value={i}
            onChange={handleOptionChange}
          />
          <label>{o}</label>
        </div>
      ))}
    </div>
  );
}

export default Question;
