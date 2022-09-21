import React from 'react';
import Comp from './Comp';

function RenderProp() {
    return (
        <>
            <Comp simpleFunction={() => 42} />
        </>
    )
}

export default RenderProp;