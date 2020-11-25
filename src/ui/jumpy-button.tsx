import React from 'react';

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {

};

export function JumpyButton(props: Props) {
    const ref = React.createRef<HTMLButtonElement>();

    return <button ref={ref} {...props} className={`jumpy ${props.className}`} onClick={(e) => {
        //Animation
        if (ref.current) {
            ref.current.classList.add('jumpyClick');
            const el = ref.current;
            setTimeout(() => {
                if (el) {
                    el.classList.remove('jumpyClick');
                }
            }, 100);
        }

        //Actual click
        if (props.onClick) {
            props.onClick(e);
        }
    }}>{props.children}</button>
}