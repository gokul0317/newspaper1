import React, { createContext, useContext } from "react";

const initialState = {
    isLoggedIn: false
};

const AppContext = createContext(initialState);

export const useAppContext = () => {
    return useContext(AppContext);
}

export const AppContextProvider = (props) => {
    const AppContextData = {
        isLoggedIn: false
    };
    return <AppContext.Provider value={AppContextData}>{props.children}</AppContext.Provider>
}