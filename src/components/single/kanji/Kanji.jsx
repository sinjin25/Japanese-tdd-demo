import { useState } from 'react'
import './Kanji.scss'
import KanjiToolTip from './KanjiToolTip'

export default function({kanji, defs, readings}) {

    let [hovering, setHovering] = useState(false)
    const enterHandler = () => {
        console.log('handler', hovering)
        setHovering(true)
    }
    const leaveHandler = () => {
        console.log('leave', hovering)
        setHovering(false)
    }
    return (
        <div className="kanji-container" onMouseEnter={enterHandler} onMouseLeave={leaveHandler}>
            <span
            title={readings.toString()}
            className="kanji-block"
            >{kanji}</span>
            <KanjiToolTip
            visible={hovering}
            readArr={readings}
            defArr={defs}
            />
        </div>
    )
}