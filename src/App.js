import './App.scss';
import './css/util.scss';
import { useState, useEffect } from 'react';
import Question from './components/question/Question'
import burnerWord from './js/burner-word'
import Definition from './components/single/definition/Definition'

function App() {
  
  return (
    <div className="App">
      <Question />
      <Definition entries={burnerWord.consume()}/>
    </div>
  );
}

export default App;
