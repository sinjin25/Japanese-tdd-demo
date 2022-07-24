export class Word {
    DUP_READING = 'duplicate reading key for item'
    BAD_IMPORTANCE = 'wrong type for importance'
    constructor(word) {
        this.kanji = word
        this.data = {}
        this.kanjiData = {}
        this.sorting = []
    }
    // API
    appendReading(reading, importance) {
        this.verifyReading(reading)
        this.verifyImportance(importance)

        const structure = this.createReadingStructure(importance)
        this.data[reading] = structure
        this.sorting.push(reading)
    }
    appendDefinition(reading, pos, definitions) {
        this.data[reading].append(pos, definitions)
    }
    appendKanji(entry) {
        this.kanjiData[entry.kanji] = entry
    }
    consume() {
        const consumableData = this.sorting.map((aKey) => {
            // convert this to a class or something
            return this.data[aKey].consume(aKey)
        })
        console.log('consume', consumableData)
        return consumableData
    }
    consumeKanji() {
        const keys = Object.keys(this.kanjiData)
        const consumableData = keys.map((i) => this.kanjiData[i].consume())
        return consumableData
    }
    // PRIVATE USE
    createReadingStructure(importance) {
        return new WordEntry(importance)
    }
    // VERIFICATION
    verifyReading(reading) {
        if (this.data[reading] !== undefined) throw Error(this.DUP_READING)
    }
    verifyImportance(importance) {
        if (typeof importance !== 'number') throw Error(this.BAD_IMPORTANCE)
    }
    
}

export class WordEntry {
    BAD_DEF_FORMAT = 'incorrect type for definitions'
    BAD_POS_FORMAT = 'incorrect type for part of speech'
    EMPTY_DEF = 'trying to append empty definition'
    constructor(importance) {
        this.importance = importance
        this.data = []
        this.kanjiData = {}
    }
    // API
    append(pos, definitions) {
        this.verifyPosFormat(pos)
        this.verifyDefinitionFormat(definitions)

        this.data.push({
            pos,
            definitions,
        })
    }
    // TODO: Add real appendKanji
    appendKanji(model) {
        this.kanji[model.kanji] = model
    }
    consume(label) {
        return {
            label: label || null,
            data: this.data,
            kanjiData: this.kanjiData,
            importance: this.importance,
        }
    }
    // VERIFICATION
    verifyDefinitionFormat(definitions) {
        if (Array.isArray(definitions) === false) throw Error(this.BAD_DEF_FORMAT)
        if (definitions.length === 0) throw Error(this.EMPTY_DEF)
    }
    verifyPosFormat(pos) {
        if (typeof pos !== 'string') throw Error(this.BAD_POS_FORMAT)
    }
}