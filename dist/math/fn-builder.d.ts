/**
 * A function that provides a value.
 */
export declare type ValFn = () => number;
export declare const valFn: {
    readonly const: (constant: number) => () => number;
    readonly mult: (vals: ValFn[]) => () => number;
    readonly add: (vals: ValFn[]) => () => number;
    readonly div: (f: ValFn, g: ValFn) => () => number;
    readonly subt: (f: ValFn, g: ValFn) => () => number;
    readonly pow: (base: ValFn, exponent: ValFn) => () => number;
    readonly abs: (f: ValFn) => ValFn;
    readonly sqrt: (f: ValFn) => ValFn;
};
//# sourceMappingURL=fn-builder.d.ts.map