import React, { useState } from 'react';
import { addStyles, EditableMathField } from 'react-mathquill';
import { CalcErr, CalcFn } from '../math/calculate';
import { JumpyButton } from './jumpy-button';
import { NumberSlider } from './number-slider';
import { RectSelect } from './rect-select';

interface Props {
    calculate: CalcFn
}

addStyles();

export function App({ calculate }: Props ) {
    const [sum, setSum] = useState<number | undefined | CalcErr>();
    const [latex, setLatex] = useState('\\int_0^1 x');
    const [rectNum, setRectNum] = useState(10);
    const [old, setOld] = useState(true);

    return <div>
        <div className='app'>
            <div className='fakeMathField'>
                <div className='inputWrapper'>
                    <EditableMathField className='mqField' config={{
                        //autoOperatorNames: 'int'
                    }} onChange={field => {
                        setLatex(field.latex());
                        setOld(true);
                    }} latex={latex}></EditableMathField>
                </div>
                <span className='fakeMathInline'><var>dx</var> ≈ <span className={`answer ${old ? 'old' : ''}`}>{getText(sum)}</span></span>
            </div>
            <NumberSlider value={rectNum} onChange={val => {
                setRectNum(Math.floor(val));
                setOld(true);
            }}></NumberSlider>
            <div className='buttonRow'>
                <JumpyButton className='darkButton' onClick={() => {
                    try {
                        setSum(calculate({
                            latex,
                            sumType: 'left',
                            rectNum
                        }));
                        setOld(false);
                    } catch (e) {
                        console.error(e);
                        setSum(e);
                    }
                }}>Compute</JumpyButton>
                <JumpyButton className='lightButton' onClick={() => alert('Everything in blue can already be edited.')}>Edit</JumpyButton>
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