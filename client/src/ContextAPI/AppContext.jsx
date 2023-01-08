import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { UserService } from "../api/userApi";
import { useGlobalContext } from "./GlobalContext";
import { parseErrorMessage } from "../utils/helpers";

const userService = new UserService();

const initialState = {
    isLoggedIn: false,
    profile: {
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        image: null
    },
    loading: false,
    updateProfile: () => { },
    setLoading: () => { },
    userService,
    setIsLoggedIn: () => { }
};

const AppContext = createContext(initialState);

export const useAppContext = () => {
    return useContext(AppContext);
}

export const AppContextProvider = (props) => {
    const { token, showAlert } = useGlobalContext();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profile, setProfile] = useState(initialState?.profile);
    const [loading, setLoading] = useState(initialState?.loading);


    const updateProfile = useCallback(async (updatedValue) => {
        try {
            setLoading(true);
            await userService.updateprofile(token, { ...updatedValue });
            showAlert({ message: "Profile updated succesfully", severity: "success" })
            setProfile({ ...updatedValue, password: "" });
        } catch (e) {
            console.log(e, "Update profile error");
            const message = parseErrorMessage(e, "Failed to updated profile");
            console.log(message, "message")
            showAlert({ message,  severity: "error" })
        } finally {
            setLoading(false)
        }
    //eslint-disable-next-line  react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const cb = async () => {
            if (token) {
                try {
                    const resp = await userService.getProfile(token);
                    setProfile({ ...resp.data.data, password: "" });
                    if (resp) {
                        setIsLoggedIn(true);
                    } else {
                        setIsLoggedIn(false);
                    }
                } catch (e) {
                    setIsLoggedIn(false);
                }
            } else {
                setIsLoggedIn(false);
            }
        }
        cb();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn])

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