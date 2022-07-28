import { Fragment, useEffect, useState, useRef } from "react"
import FlowGen from "@/js/flow-generator"
import { InputConverter } from '../../single'
import { checkAnswer } from '../../../js/question-util'

function QuestionInput({ word, mode, onFinish }) {
    let [inJpMode, setinJpMode] = useState(false)
    const inJpModeRef = useRef(false)
    inJpModeRef.current = inJpMode
    let [typable, settypable] = useState(true)
    let [roll, setroll] = useState()
    let [answerWasCorrect, setanswerWasCorrect] = useState(false)
    const answerWasCorrectRef = useRef(false)
    answerWasCorrectRef.current = answerWasCorrect
    let [answeredWith, setansweredWith] = useState('')

    const evaluateAnswer = (v) => {
        const result = checkAnswer({
            input: v,
            key: answeredWith || undefined,
            model: word,
        })
        trackAnswer(result, v)
        settypable(false)
    }

    const trackAnswer = (correct, value) => {
        console.log('TRACK ANSWER', correct, value)
        setanswerWasCorrect(correct)
        // record answered with value
        console.log('TRACK2', inJpModeRef.current)
        if (inJpModeRef.current === true) setansweredWith(value)
        else console.log('WE ARENT IN JP MODE???', inJpMode)
    }

    const reset = () => {
        console.log('reste sending up', answerWasCorrect, 'vs', answerWasCorrectRef.current)
        bubbleUp(answerWasCorrectRef.current)
        settypable(true)
    }

    const bubbleUp = (v) => {
        if (onFinish) onFinish(v)
    }

    const handleEnter = (v) => {
        roll.iterate(v)
    }

    useEffect(() => {
        setroll(new FlowGen(
            evaluateAnswer,
            reset,
        ))
    }, [])

    useEffect(() => {
        console.log('mode changed to', mode)

        // FIXME: so this is where the stale closure begins (was false, now true)
        setinJpMode(val => mode === 'reading' ? true : false)
    }, [mode])

    const stylingQuestionInput = () => {
        const styles = ['question-input']
        if (!typable) {
            if (answerWasCorrect) styles.push('--success')
            else styles.push('--failure')
        }
        return styles.join(' ')
    }

    return (<Fragment>
        <InputConverter
            className={typable ? 'question-input' : stylingQuestionInput()}
            convertToJp={inJpMode}
            typable={typable}
            clearOnSubmit={typable ? false : true}
            hSubmit={handleEnter}
        />
    </Fragment>)
}

export default QuestionInput