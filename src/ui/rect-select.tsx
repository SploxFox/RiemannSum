import React from 'react';

interface Props {
    value: number,
    onChange: (val: number) => void
}

export function RectSelect({ value, onChange }: Props) {
    return <div>
        <span>Number of Rectangles</span>
        <input type='number' value={value} onChange={el => onChange(Number(el.target.value))}></input>
        <input type='range' step='any' value={Math.log(value)} min={0} max={15} onChange={el => onChange(Math.exp(+el.target.value))}></input>
    </div>
}