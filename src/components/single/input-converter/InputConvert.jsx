import converter from '../../../js/jp-input'
import { useState } from 'react'

export default ({placeholderText}) => {

    let [value, setValue] = useState('')

    const handleChange = (e) => {
        const {target} = e
        const v = target.value
        setValue(converter(v, false))
    }
    return (
        <input
        value={value}
        placeholder={placeholderText || 'Type a word'}
        onChange={handleChange} />
    )
}