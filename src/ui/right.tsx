import React from "react";

interface Props {
    children: React.ReactNode
}

export function Right(props: Props) {
    return <div className='right'>
        { props.children }
    </div>
}