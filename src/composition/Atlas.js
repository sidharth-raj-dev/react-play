import React, { useState, useEffect, useContext, useReducer } from 'react';

const initialState = {
};

function reducer(state, action) {
    if (action.type.match(/change_/g)) {
        return {
            ...state,
            [action.nameOfstateToChange]: action.payload
        }
    } else {
        return state;
    }
}

const Context = React.createContext();

function InputText({ settingsName }) {
    const [input, setInput] = useState('');
    const context = useContext(Context);

    function onChange(event) {
        setInput(event.target.value);
    }

    function onClick() {
        context.changeState(settingsName, input);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>{settingsName} :</div>
            <input id={settingsName} onChange={onChange} type="text" placeholder={context.allSettings[settingsName]}></input>
            <button onClick={onClick}>ok</button>
        </div>
    )
}

function InputNumber({ settingsName }) {
    const [input, setInput] = useState(0);
    const context = useContext(Context);

    function onChange(event) {
        setInput(event.target.value);
    }

    function onClick() {
        // props.onClick(input);
        context.changeState(settingsName, input);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>{settingsName} :</div>
            <input id={settingsName} onChange={onChange} type="number" placeholder={context.allSettings[settingsName]}></input>
            <button onClick={onClick}>ok</button>
        </div>
    )
}

function FunctionReader({ settingsName, functionBody }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>{settingsName} :</div>
            <div> {typeof (functionBody)} </div>
        </div>
    )
}

function InputTextInObject({ settingsName, path, originalObject, originalObjectName }) {
    const [input, setInput] = useState('');
    const context = useContext(Context);
    const processedPath = `${path}.${settingsName}`
        .slice(1)
        .split('.')
        .slice(1)
        .join('.');

    function onChange(event) {
        setInput(event.target.value);
    }

    function onClick() {
        const clonedObject = { ...originalObject };
        eval(`clonedObject.${processedPath} = input`);
        context.changeState(originalObjectName, clonedObject);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>{settingsName} :</div>
            <input id={settingsName} onChange={onChange} type="text" placeholder={eval(`originalObject.${processedPath}`)}></input>
            <button onClick={onClick}>ok</button>
        </div>
    )
}

function InputNumberInObject({ settingsName, path, originalObject, originalObjectName }) {
    const [input, setInput] = useState(0);
    const context = useContext(Context);
    const processedPath = `${path}.${settingsName}`
        .slice(1)
        .split('.')
        .slice(1)
        .join('.');

    function onChange(event) {
        setInput(event.target.value);
    }

    function onClick() {
        const clonedObject = { ...originalObject };
        eval(`clonedObject.${processedPath} = input`);
        context.changeState(originalObjectName, clonedObject);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>{settingsName} :</div>
            <input id={settingsName} onChange={onChange} type="number" placeholder={context.allSettings[settingsName]}></input>
            <button onClick={onClick}>ok</button>
        </div>
    )
}

function ObjectTree({ object, settingsName, path, originalObject, originalObjectName }) {
    const newPath = path + '.' + settingsName;

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>{settingsName} :</div>
            <div>
                {Object.keys(object).map((key) => {
                    if (typeof (object[key]) === 'object' && object[key] != null) {
                        return <ObjectTree
                            settingsName={key}
                            object={object[key]}
                            path={newPath}
                            originalObject={originalObject}
                            key={key}
                            originalObjectName={originalObjectName} />
                    } else if (typeof (object[key]) === 'string') {
                        return <InputTextInObject
                            settingsName={key}
                            key={key}
                            path={newPath}
                            originalObject={originalObject}
                            originalObjectName={originalObjectName} />
                    } else if (typeof (object[key]) === 'number') {
                        return <InputNumberInObject
                            settingsName={key}
                            key={key}
                            path={newPath}
                            originalObject={originalObject}
                            originalObjectName={originalObjectName} />
                    } else {
                        return <FunctionReader
                            settingsName={key}
                            functionBody={object[key]}
                            key={key} />
                    }
                })}
            </div>

        </div>

    );
}

function UserInterface() {
    const context = useContext(Context);

    function makeStateChangers(tree) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {Object.keys(tree).map(
                    (settingsName) => {
                        if (typeof (tree[settingsName]) === 'object') {
                            return <ObjectTree
                                settingsName={settingsName}
                                object={tree[settingsName]}
                                path=""
                                originalObject={tree[settingsName]}
                                originalObjectName={settingsName}
                                key={settingsName} />
                        } else if (typeof (tree[settingsName]) === 'string') {
                            return <InputText settingsName={settingsName} key={settingsName} />
                        } else if (typeof (tree[settingsName]) === 'number') {
                            return <InputNumber settingsName={settingsName} key={settingsName} />
                        } else {
                            return <FunctionReader
                                settingsName={settingsName}
                                functionBody={tree[settingsName]}
                                key={settingsName} />
                        }
                    }
                )}
            </div>
        );
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: '0px',
            left: '0px',
            height: '200px',
            overflow: 'scroll',
            background: 'yellow',
            padding: '10px',
            margin: '10px'
        }}>
            {makeStateChangers(context.allSettings)}
        </div>
    )
}

function Atlas({ children }) {
    const [modified, setModified] = useState(false);
    const [settings, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        console.log('Atlas Mounted');
    }, []);

    function changeState(nameOfstateToChange, valueOfState) {
        dispatch({ type: `change_${nameOfstateToChange}`, nameOfstateToChange: nameOfstateToChange, payload: valueOfState });
        setModified(true);
    }

    function modifyWithNewProps() {
        return React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, settings);
            }
            return child;
        });
    }

    return (
        <div style={{ border: '1px solid blue' }}>
            {modified
                ? modifyWithNewProps(children)
                : children}
            <Context.Provider value={{
                changeState: changeState,
                allSettings: children.props
            }}>
                <UserInterface />
            </Context.Provider>
        </div>
    )
}

export default Atlas;
