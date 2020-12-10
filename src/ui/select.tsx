import React from 'react';
import SelectEl, { OptionsType, Styles } from 'react-select';

const background = 'var(--secondaryDark)';

function customStyles(index: number): Styles {
    return {
        option: (provided, state) => ({
            ...provided,
            background,
        }),
        control: (provided) => ({
            ...provided,
            background,
            color: 'var(--secondaryAccent)',
        }),
        container: (provided) => ({
            ...provided,
            zIndex: index
        }),
        menu: (provided) => ({
            ...provided
        }),
        singleValue: (p) => ({
            ...p,
            color: 'white'
        })
    }
}


export type SelectProps = SelectEl['props'];
export function Select(props: SelectProps) {
    return <SelectEl styles={customStyles(props.zIndex ?? 2)} {...props}/>
}