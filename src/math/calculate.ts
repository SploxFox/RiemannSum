// @ts-ignore
import { parse as parseLatex } from '@scicave/math-latex-parser';
import { valFn, ValFn } from './fn-builder';

export interface CalcArgs {
    latex: string,
    sumType: 'left' | 'right' | 'trapezoid',
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

/**
 * The function that takes in a CalcArgs object and returns the computed Reimann sum.
 */
export function calculate({ latex, sumType, rectNum }: CalcArgs): number | CalcErr {
    console.log(latex);
    const start = performance.now();

    // Create an abstract syntax tree (AST) from the latex using an external library
    const ast = parseLatex(latex);

    if (ast.type != 'int') {
        // Not an integral.
        return err('Not an integral');
    }

    

    if (ast.args[0]?.type != 'number' || ast.args[1]?.type != 'number') {
        return err('Integrals must be plain numbers (for now).')
    }

    const [ minNode, maxNode, root ] = ast.args;
    const min = minNode.value;
    const max = maxNode.value;

    let x: number;
    let dx: number;

    const getVal = () => x;

    const { parseNode, parseOperator } = getParsers(getVal);

    const fn = parseNode(root);

    (window as any).fn = fn;

    let sum = 0;
    dx = (max - min) / rectNum;
    console.log({ dx });

    for (let i = 0; i < rectNum; i++) {
        x = min + (dx * i);

        //console.log({ x });
        //console.log(`Sum: ${sum}`);

        sum += fn() * dx;
    }

    const end = performance.now();

    console.log(`Computation took ${end - start} ms`);

    return sum;
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

