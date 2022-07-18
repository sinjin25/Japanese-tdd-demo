export function pipe(...args) {
    return function(input) {
        return args.reduce((currentVal, aFn) => aFn(currentVal), input)
    }
}