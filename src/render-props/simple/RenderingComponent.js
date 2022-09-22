import React from 'react';

function RenderingComponent(props) {
    return (
        <div style={{ border: "1px solid black" }}>
            {props.simpleFunction()}
        </div>
    )
}

export default RenderingComponent;