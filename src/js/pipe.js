export function pipe(...args) {
    return function(input) {
        return args.reduce((currentVal, aFn) => aFn(currentVal), input)
    }
}

// use a method in a pipe
// ex: pipe(replace(';', ','))('My random; input; !')
export function pipeMethod(cb, ...args) {
    return function(input) {
        return input[cb](...args)
    }
}

export function capitalizeFirst(input) {
    const first = input[0]
    return first.toUpperCase() + input.slice(1)
}