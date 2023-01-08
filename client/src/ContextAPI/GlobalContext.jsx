import React, { createContext, useContext, useMemo } from "react";
import useAlert from "../hooks/useAlert";
import { useTokenLocalStorage } from "../hooks/useTokenLocalStorage";

const initialState = {
    alertItem: null,
    showAlert: () => { },
    addToken: () => { },
    getToken: () => { },
    token: null,
    removeToken: () => {}
};

const GlobalContext = createContext(initialState);

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}

export const GlobalContextProvider = (props) => {
    const { alertItem, showAlert } = useAlert();
    const { addToken, getToken, removeToken } = useTokenLocalStorage();
    const token = useMemo(() => getToken(), [getToken])
    const GlobalContextData = {
        alertItem,
        showAlert,
        addToken,
        getToken,
        token,
        removeToken
    };
    return <GlobalContext.Provider value={GlobalContextData}>{props.children}</GlobalContext.Provider>
}