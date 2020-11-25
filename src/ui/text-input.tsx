import React from 'react';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export function TextInput(props: Props) {
    return <div className='inputWrapper'>
        <input type='text' className='textInput' {...props}></input>
    </div>
}