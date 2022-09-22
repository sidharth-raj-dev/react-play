import React from 'react';
import Comp from './Comp';


// here the function passed as prop to Comp is outputting a number
function RenderProp() {
    return (
        <>
            <Comp simpleFunction={() => 42} />
        </>
    )
}

export default RenderProp;