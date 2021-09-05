import React, { createContext, useState } from 'react';

const SessionContext = createContext({});

const SessionProvider = ({ children }) => {

    const [session, setSession] = useState(_.isString(localStorage.getItem('session')) ? JSON.parse(localStorage.getItem('session')) : {});

    const updateFunctions = {
        setSession,
    }

    return (
        <SessionContext.Provider
            value={{
                contextObject: session,
                updateFunctions,
            }}
        >
            {children}
        </SessionContext.Provider>

    );
}

export { SessionContext };
export default SessionProvider;
