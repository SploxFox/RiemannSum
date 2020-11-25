export interface CalcArgs {
    latex: string;
    sumType: 'left' | 'right' | 'trapezoid';
    rectNum: number;
}
/**
 * The type of the function that takes in a CalcArgs object and returns the computed Reimann sum.
 */
export declare type CalcFn = (args: CalcArgs) => number | CalcErr;
export declare type CalcErr = {
    isErr: true;
    msg: string;
};
/**
 * The function that takes in a CalcArgs object and returns the computed Reimann sum.
 */
export declare function calculate({ latex, sumType, rectNum }: CalcArgs): number | CalcErr;
//# sourceMappingURL=calculate.d.ts.map