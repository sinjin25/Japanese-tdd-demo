import deepcopy from "deepcopy"

export default class Kanji {
    ERR_NOT_KANJI = 'A kanji compound must be exactly one character'
    DUP_READING = 'Attempted to add duplicate reading'
    DUP_DEFINITION = 'Attempted to add duplicate definition'
    WRONG_TYPE_DEF = 'Received wrong type for def'
    WRONG_TYPE_READ = 'Received wrong type for reading'
    ZERO_LEN_DEF = 'Received zero length string for def'
    ZERO_LEN_READ = 'Received zero length string for reading'
    constructor(kanji) {
        this.kanji = kanji
        this.data = {
            readings: [], // on readings
            definitions: []
        }

        this.verifyKanji(kanji)
    }
    addReading(reading) {
        if (!this.verifyReading(reading)) return

        const found = this.data.readings.find((i) => i === reading)
        if (found) throw Error(this.DUP_READING)
        this.data.readings.push(reading)
    }
    addDefinitions(...strs) {
        let added = []
        let lastErr
        strs.forEach((i) => {
            try {
                this.addADefinition(i)
                added.push(added)
            } catch(e) {
                lastErr = e
            }
        })
        // if nothing added
        if (added.length === 0) throw Error(lastErr)
        return added
    }
    addADefinition(str) {
        if (!this.verifyDefinition(str)) return

        const found = this.data.definitions.find((i) => i === str)
        if (found) throw Error(this.DUP_DEFINITION)
        this.data.definitions.push(str)
    }
    // consume
    consume() {
        return {
            label: this.kanji,
            data: deepcopy(this.data),
        }
    }
    // verify
    verifyReading(str) {
        if (typeof str !== 'string') throw Error(this.WRONG_TYPE_READ+str)
        if (str.length === 0) throw Error(this.ZERO_LEN_READ)
        return true
    }
    verifyKanji(str) {
        if (str.length > 1 || str.length === 0) throw Error(this.ERR_NOT_KANJI+str)
        return true
    }
    verifyDefinition(str) {
        if (typeof str !== 'string') throw Error(this.WRONG_TYPE_DEF+str)
        if (str.length === 0) throw Error(this.ZERO_LEN_DEF)
        return true
    }
}