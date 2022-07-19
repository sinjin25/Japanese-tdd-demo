// library for handling jp input
import { isHiragana, toKana } from 'wanakana'

export function convertToJp(input, finalize = true) {
    let modifiedInp = input
    if (finalize) {
        // simplest solution
        return toKana(modifiedInp.replace(/nn/, 'n'))
    }
    // standard flow
    const isHiragana = identifyLatestInput(modifiedInp.slice(-1))
    if (isHiragana) {
        modifiedInp = hiraganaFlow(input)
    } else {
        // katakana
        modifiedInp = katakanaFlow(input)
    }
    return modifiedInp
}

function identifyLatestInput(input) {
    const KATAKANA = /[A-Z]/
    if (input.match(KATAKANA)) return false
    return true
}

function katakanaFlow(input) {
    let lastCharacter = input.slice(-1)
    let modifiedInp = input
    modifiedInp = modifiedInp.replace(/NN$/, 'ン') // finalize nn
    .replace(/N$/, '*') // take last char which is either ン or romaji
    .replace(/NN/, 'N') // finalize more nn
    return toKana(modifiedInp)
    .toUpperCase()
    .replace('*', 'N')
}

function hiraganaFlow(input) {
    let modifiedInp = input
    modifiedInp = modifiedInp.replace(/nn$/, 'ん')
    .replace(/n$/, '*')
    .replace(/nn/, 'n')
    return toKana(modifiedInp).replace('*', 'n')
}

export default convertToJp