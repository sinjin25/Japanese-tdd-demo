import converter from '../../../js/jp-input'
import { useState } from 'react'

export default ({
    className = '',
    placeholderText,
    convertToJp = false,
    typable = true,
    clearOnSubmit = false,
    hSubmit
}) => {
// TODO: don't clear until second run of finalize
    let [value, setValue] = useState('')

    const handleChange = (e) => {
        const {target} = e
        const v = target.value
        if (convertToJp) setValue(converter(v, false))
        else setValue(v)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            if (hSubmit) {
                const valueToSend = finalize()
                console.log('handlekey', valueToSend)
                hSubmit(valueToSend)
                if (clearOnSubmit) setValue('')
            }
            return
        }
    }

    const handleKeyDown = (e) => {
        if (typable === false) {
            e.preventDefault()
            return
        }
    }

    const finalize = () => {
        const finalVal = value
        return finalVal
    }
    
    return (
        <input
        className={className}
        value={value}
        placeholder={placeholderText || 'Type a word'}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyPress}
        onChange={handleChange} />
    )
}