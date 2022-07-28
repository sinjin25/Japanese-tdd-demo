import burnerWord from '../../js/burner-word'
import Word from '../word/Word'
import Definition from '../single/definition/Definition'
import './Question.scss'
import React from 'react'
import QuestionInput from './input/QuestionInput'

export default class Question extends React.Component {

  constructor(props) {
    super(props)
    const word = burnerWord

    this.state = {
      word: word,
      mode: 'reading'
    }
  }

  buildWord = () => {
    const { word } = this.state
    const data = word.consume()
    const data2 = word.consumeKanji()

    return (<Word
      label={word.kanji}
      data={data.data}
      kanjiInfo={data2}
    />)
  }

  nextQuestion = (wasCorrect) => {
    console.log('nextq', wasCorrect)
    
    const onCorrect = this.state.mode === 'reading' ? 'meaning' : 'reading'
    
    if (wasCorrect) {
      if (this.state.mode === 'meaning') {
        // TODO: should switch questions if the mode was 'meaning'
      }
      this.setState({
        mode: onCorrect
      })
    }

  }

  

  // this is out of sync
  

  render() {
    const { word } = this.state

    return (
      <div className="question">
        <div className="question-inner">
          <h2>What is the <span className='c-accent'>definition</span> for:</h2>
          <div className="question-main">
            {this.buildWord()}
          </div>
          <QuestionInput
          word={word}
          mode={this.state.mode}
          onFinish={this.nextQuestion}/>
          <Definition
            entries={word.consume()}
          />
        </div>
      </div>
    )

    
  }
}