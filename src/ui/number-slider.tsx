import React from 'react';
import ReactSlider from 'react-slider';
import { TextInput } from './text-input';

interface Props {
    toSlider?: (num: number) => number
    fromSlider?: (num: number) => number
    onChange: (val: number) => void
    label?: string
    value: number
}

export function NumberSlider(props: Props) {
    return <div>
        
        <TextInput pattern='[0-9]*' value={props.value} onChange={e => {
            const num = Number((e.target as any).textContent);
            if (!isNaN(num)) {
                props.onChange(num);
            }
        }}></TextInput>
        <ReactSlider step={0.01} value={(props.toSlider ?? (v => v))(props.value)} onChange={(val) => (props.fromSlider ?? (v => v))(val as number)}></ReactSlider>
    </div>
}