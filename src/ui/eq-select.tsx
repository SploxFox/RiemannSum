import React from 'react';
import { StaticMathField } from 'react-mathquill';
import { Select, SelectProps } from './select';

export function EqSelect(props: SelectProps) {
    return <Select zIndex={3} {...props}   components={{
        Option: (props) => <div className='eqOption' ref={props.innerRef} {...props.innerProps}><StaticMathField style={{ pointerEvents: 'none' }}>{props.children + 'dx'}</StaticMathField></div>
    }}/>
}