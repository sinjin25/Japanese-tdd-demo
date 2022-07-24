import './App.scss';
import Word from './components/word/Word'
import Kanji from './components/single/kanji/Kanji'
import { useState, useEffect } from 'react';
import burnerWord from './js/burner-word'

function App() {

  useEffect(() => {
  }, [])

  const buildWord = () => {
    if (!burnerWord) return
    console.log('!!!', burnerWord)
    const data = burnerWord.consume()
    const data2 = burnerWord.consumeKanji()
    console.log(data, data2)
    return (<Word
      label={burnerWord.kanji}
      data={data.data}
      kanjiInfo={data2}
    />)
  }

  return (
    <div className="App">
      <div>
        {buildWord()}
      </div>
    </div>
  );
}

export default App;
