import React from "react";
import InputComponent from "./InputComponent";
import HigherOrderCompClassBased from "./HigherOrderCompClassBased";

const NewModifiedComponent = HigherOrderCompClassBased(InputComponent);

function DemoApp() {
    return (
        <>
            <NewModifiedComponent />
        </>
    )
}

export default DemoApp;