import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { UserService } from "../api/userApi";
import { useGlobalContext } from "./GlobalContext";

const userService = new UserService();

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
    updateProfile: () => { },
    setLoading: () => { },
    userService,
    setIsLoggedIn: () => {}
};

const AppContext = createContext(initialState);

export const useAppContext = () => {
    return useContext(AppContext);
}

export const AppContextProvider = (props) => {
    const { token } = useGlobalContext();
    const [isLoggedIn, setIsLoggedIn] = useState(!!token);
    const [profile, setProfile] = useState(initialState?.profile);
    const [loading, setLoading] = useState(initialState?.loading);

    const updateProfile = useCallback((profile) => {
        setProfile(profile);
    }, [])

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const AppContextData = {
        isLoggedIn,
        profile,
        loading,
        updateProfile,
        setLoading,
        userService,
        setIsLoggedIn,
    };

    return <AppContext.Provider value={AppContextData}>{props.children}</AppContext.Provider>
}