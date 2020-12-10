// @ts-ignore
import { parse as parseLatex } from '@scicave/math-latex-parser';
import { infty } from '..';
import { valFn, ValFn } from './fn-builder';

(window as any).parseLatex = parseLatex;

export interface CalcArgs {
    latex: string,
    sumType: 'left' | 'right' | 'upper' | 'lower',
    rectNum: number
}

/**
 * The type of the function that takes in a CalcArgs object and returns the computed Reimann sum.
 */
export type CalcFn = (args: CalcArgs) => number | CalcErr;

export type CalcErr = {
    isErr: true,
    msg: string
}

function err(msg: string) {
    return {
        isErr: true,
        msg
    } as const;
}

interface Node {
    value?: number,
    name?: string,
    args: Node[] | null,
    type: string
}


function getNum(ast: Node) {
    if (ast.name == 'infty') {
        return infty;
    } else if (ast.type == 'number') {
        return ast.value!;
    } else {
        throw err('Failed to read number ' + JSON.stringify(ast))
    }
}

/**
 * The function that takes in a CalcArgs object and returns the computed Reimann sum.
 */
export function calculate({ latex, sumType, rectNum }: CalcArgs): number | CalcErr {
    console.log(latex);
    const start = performance.now();

    // Create an abstract syntax tree (AST) from the latex using an external library
    // Unfortunately, the parser that I'm using seems to throw an error on sin, cos and other
    // functions and I didn't find it until it was too late :(
    const ast = parseLatex(latex) as Node;
    console.log(ast)

    if (ast.type != 'int') {
        // Not an integral.
        throw err('Not an integral');
    }

    const [ minNode, maxNode, root ] = ast.args!;
    const min = getNum(minNode);
    const max = getNum(maxNode);

    let x: number;
    let dx: number;

    const getVal = () => x;

    const { parseNode, parseOperator } = getParsers(getVal);

    const fn = parseNode(root);

    (window as any).fn = fn;

    let sum = 0;
    dx = (max - min) / rectNum;
    console.log({ dx });

    // Main loop that computes each rectangle of the Riemann function. This code isn't very nice
    // but I don't have the time to fix it.
    for (let i = 0; i < rectNum; i++) {
        if (sumType == 'left') {
            x = min + (dx * i);
        } else if (sumType == 'right') {
            x = min + (dx * (i + 1));
        } else if (sumType == 'lower' || sumType == 'upper') {
            x = min + (dx * i);
            let left = fn();

            x = min + (dx * (i + 1));
            let right = fn();

            if (sumType == 'lower') {
                if (left < right) {
                    sum += clampInfty(left * dx);
                } else {
                    sum += clampInfty(right * dx);
                }
            } else {
                if (left > right) {
                    sum += clampInfty(left * dx);
                } else {
                    sum += clampInfty(right * dx);
                }
            }
            continue;
        }
        

        //console.log({ x });
        //console.log(`Sum: ${sum}`);

        sum += clampInfty(fn() * dx);
    }

    const end = performance.now();

    console.log(`Computation took ${end - start} ms`);

    return sum;
}

function clampInfty(num: number) {
    if (Math.abs(num) == Infinity) {
        if (num < 0) {
            return -infty
        } else {
            return infty
        }
    } else {
        return num;
    }
}

function getParsers(getVal: ValFn) {
    function parseNode(node: Node): ValFn {
        switch (node.type) {
            case 'number': return valFn.const(node.value!);
            case 'operator': return parseOperator(node);
            case 'id': return getVal;
            case 'sqrt': return valFn.sqrt(parseNode(node.args![0]));
            case 'frac': return valFn.div(parseNode(node.args![0]), parseNode(node.args![1]));
            default: throw `Uknown node type ${node.type}`
            //default: return (valFn as any)[node.type](node.args!.map(parseNode));
        }
    }
    
    function parseOperator(op: Node): ValFn {
        if (op.type != 'operator') {
            console.error(op);
            throw 'Node is not an operator';
        }
    
        const children = op.args!.map(parseNode);
        const [a, b] = children;
    
        switch (op.name) {
            case '+': return valFn.add(children);
            case '-': return valFn.subt(a, b);
    
            case 'cdot':
            case 'automult': return valFn.mult(children);

            case '^': return valFn.pow(a, b);
            
            default: throw `Unknown operator ${op.name}`
        }
    }

    return { parseNode, parseOperator }
};

