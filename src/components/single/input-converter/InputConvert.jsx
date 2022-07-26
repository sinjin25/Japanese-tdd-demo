import converter from '../../../js/jp-input'
import { useState } from 'react'

export default ({
    placeholderText,
    convertToJp = false,
    typable = true,
    hSubmit
}) => {

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
        setValue('')
        console.log('finalizing val', finalVal)
        return finalVal
    }
    
    return (
        <input
        value={value}
        placeholder={placeholderText || 'Type a word'}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyPress}
        onChange={handleChange} />
    )
}