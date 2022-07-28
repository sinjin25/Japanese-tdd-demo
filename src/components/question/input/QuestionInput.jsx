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
    let [lastAnswer, setlastAnswer] = useState({
        answeredWith: undefined,
        wasCorrect: false,
    })
    const lastAnswerRef = useRef(false)
    lastAnswerRef.current = lastAnswer

    const evaluateAnswer = (v) => {
        console.log('evalute answer with', lastAnswerRef.current)
        const result = checkAnswer({
            input: v,
            key: lastAnswerRef.current.answeredWith || undefined,
            model: word,
        })
        const toChange = { wasCorrect: result }
        if (result === true) {
            if (inJpModeRef.current === true) {
                toChange.answeredWith = v
            } else {
                toChange.answeredWith = undefined
            }
        }
        console.log('I am confused', {...lastAnswer, ...toChange})
        setlastAnswer((prev) => ({...prev, ...toChange}))
        console.log('after set', lastAnswerRef.current)
        settypable(false)
    }

    const reset = () => {
        bubbleUp(lastAnswerRef.current.wasCorrect)
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
        console.log('%clast answer got changed to ', 'font-weight: bold;', lastAnswer )
    }, [lastAnswer])

    useEffect(() => {
        console.log('mode changed to', mode)

        // FIXME: so this is where the stale closure begins (was false, now true)
        setinJpMode(val => mode === 'reading' ? true : false)
    }, [mode])

    const stylingQuestionInput = () => {
        const styles = ['question-input']
        if (!typable) {
            if (lastAnswer.wasCorrect) styles.push('--success')
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