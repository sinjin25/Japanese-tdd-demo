import {Word} from '../model/word-model'
import { kanojo1, kanojo2 } from './burner-kanji'

export const aRandomWord = new WordModel('彼女')
aRandomWord.appendReading('かのじょ', 0)
aRandomWord.appendDefinition(
    'かのじょ',
    'n',
    ['girl; woman', 'her', 'girlfriend']
)
aRandomWord.appendKanji(kanojo1)
aRandomWord.appendKanji(kanojo2)