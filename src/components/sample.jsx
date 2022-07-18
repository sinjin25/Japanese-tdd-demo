import { useState, useEffect } from "react"
import { Word } from '../model/word-model'

function Sample() {
    const READING = 'たべる'
    const POS = 'Ichidan verb, Transitive verb'
    const DEFS = [
        'to eat​',
        'to live on (e.g. a salary); to live off; to subsist on​'
    ]

    const [word] = useState(new Word('食べる'))
    word.appendReading(READING, 99)
    word.appendDefinition(READING, POS, DEFS)

    useEffect(() => {
        console.log(word)
    })

    const display = () => {
        const d = word.consume()
        console.log(d)
        const map = d.map((aReading, index) => {
            const { data, label, importance } = aReading
            const entries = data.map(displayEntry)
            console.log('entr', data)
            return (
                <div key={index}>
                    {label}
                    {entries}
                </div>
            )
        })
        return map
    }
    const displayEntry = (entry, key) => {
        const { pos, definitions } = entry
        const defs = definitions.map((i, index) => {
            return <div key={index}>{i}</div>
        })
        return (<div key={key}>
            <div>{pos}</div>
            {defs}
        </div>)
    }
    return (
        <div>
            {display()}
        </div>
    )
}

export default Sample