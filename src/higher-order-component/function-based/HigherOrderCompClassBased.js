import React, { useEffect } from 'react'

const HigherOrderCompClassBased = (OriginalComponent) => {
    function NewModifiedComponent() {

        // adding new life cycle
        // this will print something in console when
        // input component is mounted
        // thus we can say we "modified" OriginalComponent
        useEffect(() => {
            console.log(OriginalComponent.name + ' mounted');
            console.log(OriginalComponent);
        }, []);

        // also adding a light blue border in input component
        // note: pass all the required props of original component
        return (
            <div style={{ border: "1px solid lightblue" }}>
                <OriginalComponent displayText={42} />
            </div>
        );
    }
    return NewModifiedComponent;
}

export default HigherOrderCompClassBased;