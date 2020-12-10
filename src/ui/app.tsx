import React, { useState } from 'react';
import { addStyles, EditableMathField } from 'react-mathquill';
import { defaultEqs, defaultEqsOptions } from '../defaults';
import { CalcErr, CalcFn } from '../math/calculate';
import { EqSelect } from './eq-select';
import { JumpyButton } from './jumpy-button';
import { NumberSlider } from './number-slider';
import { RectSelect } from './rect-select';
import { Right } from './right';
import { Select } from './select';
import { TextInput } from './text-input';

interface Props {
    calculate: CalcFn
}

addStyles();

const options = [
    { value: 'left', label: 'Left Sum' },
    { value: 'right', label: 'Right Sum' },
    { value: 'upper', label: 'Upper Sum' },
    { value: 'lower', label: 'Lower Sum'}
];

function getOption(name: string) {
    for (const option of options) {
        if (option.value == name) {
            return option
        }
    }

    throw 'Couldnt find option ' + name
}

export function App({ calculate }: Props ) {
    const [sum, setSum] = useState<number | undefined | CalcErr>();
    const [latex, setLatex] = useState<string>('\\int_0^1 x');
    const [rectNum, setRectNum] = useState(10);
    const [old, setOld] = useState(true);
    const [sumType, setSumType] = useState('left');
    const [knownValue, setKnownValue] = useState<number | null>(null);

    return <div>
        <div className='app'>
            <div className='fakeMathField'>
                <div className='inputWrapper'>
                    <EditableMathField className='mqField' config={{
                        autoCommands: 'infty pi theta',
                        autoOperatorNames: 'sin cos tan arcsin arccos ln log'
                    }} onChange={field => {
                        setLatex(field.latex().replace('infinity', '\\infty'));
                        setOld(true);
                    }} latex={latex}></EditableMathField>
                </div>
                <span className='fakeMathInline'><var>dx</var> ≈ <span className={`answer ${old ? 'old' : ''}`}>{getText(sum)}</span></span>
            </div>
            <span>Percent error: {
                old ? '(not calculated)'
                : ((knownValue && typeof sum == 'number') ? ((sum - knownValue) / knownValue * 100 + '%') : '(exact value unknown)')}</span>
            <span>Known exact value: <TextInput value={knownValue ?? '?'} onChange={e => {
                const num = Number(e.target.value);
                setKnownValue(isNaN(num) ? null : num)
            }}></TextInput></span>
            <EqSelect options={defaultEqsOptions} onChange={e => {
                const eq = defaultEqs[Number(e?.value)];
                setLatex(eq.eq);
                setKnownValue(eq.value);
            }}/>
            <Select options={options} value={getOption(sumType)} onChange={e => setSumType(e!.value)}/>
            <NumberSlider 
                value={rectNum}
                onChange={val => {
                    setRectNum(Math.floor(val));
                    setOld(true);
                }}
                toSlider={val => Math.log(val)}
                fromSlider={val => Math.exp(val)}
                label='Number of Rectangles'
            />
            <div className='buttonRow'>
                <JumpyButton className='darkButton' onClick={() => {
                    try {
                        setSum(calculate({
                            latex: latex,
                            sumType: sumType as any,
                            rectNum
                        }));
                        setOld(false);
                    } catch (e) {
                        console.error(e);
                        setSum(e);
                    }
                }}>Compute</JumpyButton>
                <JumpyButton className='lightButton' onClick={() => alert('Everything in blue can be edited by clicking on it, and some LaTeX (square roots, powers, etc.) are supported. Start LaTeX commands with a backslash (\\).')}>Instructions</JumpyButton>
            </div>
        </div>
    </div>
}

function getText(result: CalcErr | number | undefined) {
    if (result == undefined) {
        return '(not computed)';
    } else if (typeof result == 'number') {
        return result;
    } else {
        return '(error)'
    }
}