// utils for parts of the UI aimed at asking the user questions
import WordModel from '../model/word-model'

export const checkAnswer = (opts) => {
    const { input, model, key } = opts
    /* if (!(model instanceof WordModel)) throw Error('checkAnswer requires a instance of the Word class to function') */
    if (typeof input !== 'string') throw Error('Incorrect type. checkAnswer requires a string input')
    if (key && typeof key !== 'string') throw Error('Incorrect type. checkAnswer requires a string input')
    
    let answer
    if (!key) answer = matchReading(input, model)
    else answer = matchDefinition(input, key, model)
    return answer
}

const matchReading = (input, model) => {
    if (input in model.data) return true
    return false
}

const matchDefinition = (input, key, model) => {
    if (!model.data[key]) throw Error(`key ${input} not found`)
    const data = model.data[key].data

    const found = data.find((subEntry) => {
        // loop through entry definitions array
        return subEntry.definitions.find((defs) => {
            // split ; as necessary
            const asArr = defs.split(';')
            return asArr.find((str) => {
                return str === input
            })
        })
    })
    return !!found
}