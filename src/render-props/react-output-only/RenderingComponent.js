import React, { useEffect } from 'react';

function RenderingComponent(props) {
    useEffect(() => {
        console.log('component mounted');
    }, []);

    useEffect(() => {
        console.log('component updated');
    });

    return (
        <div style={{ border: "1px solid black" }}>
            {props.simpleFunction()}
        </div>
    )
}

export default RenderingComponent;