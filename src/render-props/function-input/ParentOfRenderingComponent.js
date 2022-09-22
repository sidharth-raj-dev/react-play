import React from 'react';
import RenderingComp from './RenderingComp';
import OutputComponentOrChildComponent from './OutputComponentOrChildComponent';

// here the function passed as prop to Comp is outputting a number
function ParentOfRenderingComponent() {
    return (
        <>
            <RenderingComp simpleFunction={(clickCallback) => <OutputComponentOrChildComponent clickCallback={clickCallback} />} />
        </>
    )
}

export default ParentOfRenderingComponent;