import React from 'react';
import RenderingComponent from './RenderingComponent';

// here the function passed as prop to Comp is outputting a number
function ParentOfRenderingComponent() {
    return (
        <>
            <RenderingComponent simpleFunction={() => 42} />
        </>
    )
}

export default ParentOfRenderingComponent;