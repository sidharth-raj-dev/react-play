import React from 'react'

function OutputComponentOrChildComponent() {
    return (
        <>
            <button> Click me! </button>
            <div> I am child component of Rendering Component</div>
            <div> I am taking some life cycle code from RenderingComponent</div>
            <div> I can also share event related code. Check RenderPropReactFunctionInput component</div>
        </>
    )
}

export default OutputComponentOrChildComponent;