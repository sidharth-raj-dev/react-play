import React, { useEffect, useState } from 'react';

function RenderingComp(props) {
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        console.log('component mounted');
    }, []);

    useEffect(() => {
        console.log('component updated');
        console.log(clickCount);
    });

    function clickCallback() {
        setClickCount(clickCount + 1);
    }

    return (
        <div style={{ border: "1px solid black" }}>
            {props.simpleFunction(clickCallback)}
        </div>
    )
}

export default RenderingComp;