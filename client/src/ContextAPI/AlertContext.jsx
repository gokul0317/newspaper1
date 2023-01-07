import React, { createContext, useContext  } from "react";
import useAlert from "../hooks/useAlert";

const initialState = {
};

const AlertContext = createContext(initialState);

export const useAlertContext = () => {
    return useContext(AlertContext);
}

export const AlertContextProvider = (props) => {
    const { alertItem, showAlert } = useAlert();
    const AlertContextData = {
        alertItem,
        showAlert
    };
    return <AlertContext.Provider value={AlertContextData}>{props.children}</AlertContext.Provider>
}