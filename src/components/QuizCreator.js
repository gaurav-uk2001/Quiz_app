import React, { useState } from 'react';
import './QuizCreator.css'; // Import the CSS file

function QuizCreator({ setQuiz }) {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', options: ['', ''], correct: 0, timer: 100 }
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', ''], correct: 0, timer: 30 }]);
  };

  const handleChangeQuestion = (index, e) => {
    const newQuestions = [...questions];
    newQuestions[index][e.target.name] = e.target.value;
    setQuestions(newQuestions);
  };

  const handleChangeOption = (questionIndex, optionIndex, e) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = e.target.value;
    setQuestions(newQuestions);
  };

  const addOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push('');
    setQuestions(newQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuiz({ title, questions });
  };

  return (
    <div>
      <h2>Create a Quiz</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {questions.map((q, i) => (
          <div key={i} className='question-container'>
            <input
              type="text"
              name="question"
              placeholder={`Question ${i + 1}`}
              value={q.question}
              onChange={(e) => handleChangeQuestion(i, e)}
              required
            />
            {q.options.map((o, j) => (
  <div key={j} className="option-container">
    <input
      type="text"
      placeholder={`Option ${j + 1}`}
      value={o}
      onChange={(e) => handleChangeOption(i, j, e)}
      required
    />
  </div>
))}
            <button type="button" onClick={() => addOption(i)}>Add Option</button>
            <br></br>
            <label className="label-inline">Correct Option:</label>
<select
  name="correct"
  value={q.correct}
  onChange={(e) => handleChangeQuestion(i, e)}
  className="select-narrow"
>
  {q.options.map((_, j) => (
    <option key={j} value={j}>{`Option ${j + 1}`}</option>
  ))}
</select>
            <label style={{ display: 'inline-block', marginRight: '10px', backgroundColor:'rgb(110, 124, 255)' }}>Set Timer:</label>
<input
  type="number"
  name="timer"
  min="5"
  placeholder="Timer (seconds)"
  value={q.timer}
  onChange={(e) => handleChangeQuestion(i, e)}
  style={{ width: '50px' }}
  required
/>
          </div>
        ))}
        <button type="addmore" onClick={addQuestion}>Add more Question</button>
        <button type="submit">Save Quiz</button>
      </form>
    </div>
  );
}

export default QuizCreator;
