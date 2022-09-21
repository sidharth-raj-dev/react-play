import React from 'react'

function Comp(props) {
    return (
        <div style={{ border: "1px solid black" }}>
            {props.simpleFunction()}
        </div>
    )
}

export default Comp;