import React from 'react';
import ReactSlider from 'react-slider';
import { Right } from './right';
import { TextInput } from './text-input';

interface Props {
    toSlider?: (num: number) => number
    fromSlider?: (num: number) => number
    onChange: (val: number) => void
    label?: string
    value: number
}

export function NumberSlider(props: Props) {
    return <div className='numberSlider'>
        <Right>
            <TextInput pattern='[0-9]*' value={props.value} onChange={e => {
                const num = Number((e.target as any).value);
                if (!isNaN(num)) {
                    props.onChange(num);
                } else {
                    throw 'Number was NaN!'
                }
            }}></TextInput>
            <span style={{ flexGrow: 1 }}></span>
            <span>{props.label}</span>
        </Right>
        
        <ReactSlider
            step={0.01}
            min={0}
            max={15}
            value={(props.toSlider ?? (v => v))(props.value)}
            onChange={(val) => props.onChange((props.fromSlider ?? (v => v))(val as number))}
            thumbClassName='sliderThumb'
            trackClassName='sliderTrack'
            renderThumb={(props) => <div {...props}></div>}
        />
    </div>
}