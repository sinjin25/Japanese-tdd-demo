import { Fragment, useEffect, useState } from "react"
import FlowGen from "@/js/flow-generator"
import { InputConverter } from '../../single'
import { checkAnswer } from '../../../js/question-util'

function QuestionInput({word, mode, onFinish}) {
    let [inJpMode, setinJpMode] = useState(false)
    let [typable, settypable] = useState(true)
    let [roll, setroll] = useState()
    let [answerWasCorrect, setanswerWasCorrect] = useState(false)
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
        setanswerWasCorrect(correct)
        // record answered with value
        if (inJpMode === true) setansweredWith(value)
    }

    const reset = () => {
        settypable(true)
        console.log('reste sending up', answerWasCorrect)
        bubbleUp(answerWasCorrect)
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
        
        setinJpMode(mode === 'reading' ? true : false)
    }, [mode])

    return (<Fragment>
        <InputConverter
            convertToJp={inJpMode}
            typable={typable}
            hSubmit={handleEnter}
            />
    </Fragment>)
}

export default QuestionInput