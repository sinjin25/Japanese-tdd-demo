import x from '@/js/jp-input'

export default () => {

    const test = (e) => {
        console.log(e)
    }
    return (
        <input onChange={test} />
    )
}