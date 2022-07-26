// create a generator which executes arguments in order, one at a time, infinitely

export default class FlowGen {
    constructor(...args) {
        this.gen = myGen(...args)
        this.gen.next()
    }
    iterate(...args) {
        const arr = [
            this.gen.next([...args]),
            this.gen.next(),
            this.gen.next()
        ]
        return arr[0].value
    }
}

function* myGen(...args) {
    let argIndex = 0
    while(true) {
        // set params step
        const params = yield
        // use params step
        console.log('params were', params)
        const val = yield args[argIndex](...params)
        argIndex++
        if (argIndex === args.length) argIndex = 0
        // return step
        yield val
    }
}

/* example
const returnSmth = (a, b) => {
    return a+b
}
const returnSmth2 = (a, b) => {
    return a+b
}

const uwu = new FlowGen(returnSmth, returnSmth2)
console.log(uwu.iterate(15, 20))
console.log(uwu.iterate('a', 'b'))
console.log(uwu.iterate(54, 20)) */