
/**
 * A function that provides a value.
 */
export type ValFn = () => number;

function wrap(f: ValFn, numFn: (num: number) => number): ValFn {
    return () => numFn(f());
}

export const valFn = {
    const: (constant: number) => () => constant,
    mult: (vals: ValFn[]) => () => vals.map(fn => fn()).reduce((prev, curr) => prev * curr, 1),
    add: (vals: ValFn[]) => () => vals.map(fn => fn()).reduce((prev, curr) => prev + curr, 0),
    div: (f: ValFn, g: ValFn) => () => f() / g(),
    subt: (f: ValFn, g: ValFn) => () => f() - g(),
    pow: (base: ValFn, exponent: ValFn) => () => Math.pow(base(), exponent()),
    abs: (f: ValFn) => wrap(f, Math.abs),
    sqrt: (f: ValFn) => wrap(f, Math.sqrt)
} as const;