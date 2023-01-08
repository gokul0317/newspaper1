import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const initialState = {
    isLoggedIn: false,
    profile: {
        firstName: "Gokul",
        lastName: "krishnan P",
        password: "",
        email: "goku@gmail.com",
        image: null
    },
    loading: false,
};

const AppContext = createContext(initialState);

export const useAppContext = () => {
    return useContext(AppContext);
}

export const AppContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(initialState?.isLoggedIn);
    const [profile, setProfile] = useState(initialState?.profile);
    const [loading, setLoading] = useState(initialState?.loading);

    useEffect(() => {
        setIsLoggedIn(false);
    }, []);

    const updateProfile = useCallback((profile) => {
        setProfile(profile);
    }, [])

    const AppContextData = {
        isLoggedIn,
        profile,
        loading,
        updateProfile,
        setLoading,
    };

    return <AppContext.Provider value={AppContextData}>{props.children}</AppContext.Provider>
}