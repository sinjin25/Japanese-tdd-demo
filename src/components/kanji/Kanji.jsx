import './Kanji.scss'
import KanjiToolTip from './KanjiToolTip'

export default function({kanji, defs, readings}) {
    return (
        <div className="kanji-container">
            <span
            title={readings.toString()}
            className="kanji-block"
            >{kanji}</span>
            <KanjiToolTip readArr={readings} defArr={defs}/>
        </div>
    )
}