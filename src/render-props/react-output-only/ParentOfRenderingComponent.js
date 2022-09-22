import React from 'react';
import RenderingComponent from './RenderingComponent';
import OutputComponentOrChildComponent from './OutputComponentOrChildComponent';

// here the function passed as prop to Comp is outputting a number
function ParentOfRenderingComponent() {
    return (
        <>
            <RenderingComponent simpleFunction={() => <OutputComponentOrChildComponent />} />
        </>
    )
}

export default ParentOfRenderingComponent;