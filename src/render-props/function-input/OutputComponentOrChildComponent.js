import React from 'react'

function OutputComponentOrChildComponent(props) {
    return (
        <>
            <button onClick={props.clickCallback}> Click me! </button>
            <div> I am taking some life cycle code from RenderingComp </div>
            <div> I am also taking some event related code from RenderingComp </div>
        </>
    )
}

export default OutputComponentOrChildComponent;