
/**
 * A function that provides a value.
 */
export type ValFn = (x: number) => number;

function wrap(f: ValFn, numFn: (num: number) => number): ValFn {
    return (x: number) => numFn(f(x));
}

export const valFn = {
    const: (constant: number) => (x: number) => constant,
    mult: (vals: ValFn[]) => (x: number) => vals.map(fn => fn(x)).reduce((prev, curr) => prev * curr, 1),
    add: (vals: ValFn[]) => (x: number) => vals.map(fn => fn(x)).reduce((prev, curr) => prev + curr, 0),
    div: (f: ValFn, g: ValFn) => (x: number) => f(x) / g(x),
    subt: (f: ValFn, g: ValFn) => (x: number) => f(x) - g(x),
    pow: (base: ValFn, exponent: ValFn) => (x: number) => Math.pow(base(x), exponent(x)),
    abs: (f: ValFn) => wrap(f, Math.abs),
    sqrt: (f: ValFn) => wrap(f, Math.sqrt)
} as const;