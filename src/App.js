import React, { useState } from 'react';
import QuizCreator from './components/QuizCreator';
import QuizPlayer from './components/QuizPlayer';
import './App.css';

function App() {
  const [quiz, setQuiz] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Quiz App</h1>
      </header>
      <main>
        <div className='quiz-player'>
        {quiz === null ? (
          <QuizCreator setQuiz={setQuiz} />
        ) : (
          <QuizPlayer quiz={quiz} setQuiz={setQuiz} />
        )}
        </div>
        
      </main>
    </div>
  );
}

export default App;
