import { isKanji } from 'wanakana'
import Kanji from '../single/kanji/Kanji'
export default function({label, data, kanjiInfo}) {
    
    const displayWord = () => {
        const results = []
        for (let i = 0; i < label.length; i++) {
            const char = label[i]
            console.log(char)
            results.push(convertLabelToComponents(char))
        }
        console.log(results)
        return (<div>
            {
                results.map((i, index) => {
                    return <span key={index}>{i}</span>
                })
            }
        </div>)
    }
    const convertLabelToComponents = (char) => {
        const found = kanjiInfo.find(i => i.label === char)
        if (isKanji(char) && found) {
            console.log('!!!', found)
            return (
                <Kanji
                kanji={found.label}
                defs={found.data.definitions}
                readings={found.data.readings}
                />
            )
        }
        return char
    }
    return (
        <div>
            {displayWord()}
            <h2>{label}</h2>
        </div>
    )
}