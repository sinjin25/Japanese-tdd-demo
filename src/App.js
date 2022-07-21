import logo from './logo.svg';
import './App.scss';
import Sample from './components/sample'
import InputConvert from './components/input-converter/InputConvert'
import Word from './components/word/Word'
import Kanji from './components/kanji/Kanji'
import KanjiModel from './model/kanji-model'
import { useState, useEffect } from 'react';

function App() {
  function createKanji() {
    const sample = new KanjiModel('好')
    sample.addReading('コウ')
    sample.addDefinitions('like', 'fond of')
    return sample.consume()
  }

  const [kData, setKData] = useState(null)

  useEffect(() => {
    setKData(createKanji())
  }, [])

  const buildKanji = () => {
    if (!kData) return
    return (<Kanji
      kanji={kData.label}
      defs={kData.data.readings}
      readings={kData.data.definitions}
    />)
  }

  return (
    <div className="App">
      <Word str="好き"/>
      <div>
        {buildKanji()}
      </div>
    </div>
  );
}

export default App;
