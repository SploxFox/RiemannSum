/**
 * A function that provides a value.
 */
export declare type ValFn = (x: number) => number;
export declare const valFn: {
    readonly const: (constant: number) => (x: number) => number;
    readonly mult: (vals: ValFn[]) => (x: number) => number;
    readonly add: (vals: ValFn[]) => (x: number) => number;
    readonly div: (f: ValFn, g: ValFn) => (x: number) => number;
    readonly subt: (f: ValFn, g: ValFn) => (x: number) => number;
    readonly pow: (base: ValFn, exponent: ValFn) => (x: number) => number;
    readonly abs: (f: ValFn) => ValFn;
    readonly sqrt: (f: ValFn) => ValFn;
};
//# sourceMappingURL=fn-builder.d.ts.map