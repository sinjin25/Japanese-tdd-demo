import { useEffect } from "react"
import './Definition.scss'
import { pipe, pipeMethod, capitalizeFirst } from '../../../js/pipe'

export default function({entries}) {
    useEffect(() => {
        console.log('%centries', 'border: 2px solid blue', entries)
    }, [])

    const printEntry = (data) => {
        const definition = (defsArray) => {
            const splitToText = (str) => {
                return pipe(
                    pipeMethod('replace', ';', ', '),
                    capitalizeFirst,
                )(str)
            }
            return (
                <div className="definition-def">
                    {defsArray.map((i, index) => {
                        return <div key={index}>{index + 1}. {splitToText(i)}</div>
                    })}
                </div>
            )
        }
        return data.map((i, index) => {
            return (
                <div className="definition-entry">
                    <div className="definition-pos" key={index}>{i.pos}</div>
                    {definition(i.definitions)}
                </div>
            )
        })
    }

    const printEntries = () => {
        const jsx = entries.map((i, index) => {
            return (
                <div>
                    <h3 key={index}>{i.label}</h3>
                    {printEntry(i.data)}
                </div>
            )
        })

        return jsx
    }

    return (
        <div className="definition">
            {printEntries()}
        </div>
    )
}