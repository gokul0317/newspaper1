import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { userService } from "../api/userApi";
import { useGlobalContext } from "./GlobalContext";
import { parseErrorMessage } from "../utils/helpers";


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
    setIsLoggedIn: () => { },
    validUser: null,
    resetAppState: () => {}
};

const AppContext = createContext(initialState);

export const useAppContext = () => {
    return useContext(AppContext);
}

export const AppContextProvider = (props) => {
    const { token, showAlert } = useGlobalContext();
    const [isLoggedIn, setIsLoggedIn] = useState(initialState.isLoggedIn);
    const [profile, setProfile] = useState(initialState?.profile);
    const [loading, setLoading] = useState(initialState?.loading);
    const [validUser, setValidUser] = useState(initialState.validUser);

    const resetAppState = useCallback(() => {
        setProfile(initialState?.profile);
        setLoading(initialState?.loading);
        setValidUser(initialState?.validUser);
        setIsLoggedIn(initialState.isLoggedIn)
    }, []);

    const updateProfile = useCallback(async (updatedValue) => {
        try {
            setLoading(true);
            await userService.updateprofile(token, { ...updatedValue });
            showAlert({ message: "Profile updated succesfully", severity: "success" })
            setProfile({ ...updatedValue, password: "" });
            setValidUser(true)
        } catch (e) {
            console.log(e, "Update profile error");
            const message = parseErrorMessage(e, "Failed to updated profile");
            showAlert({ message,  severity: "error" });
            setValidUser(false);
        } finally {
            setLoading(false)
        }
    //eslint-disable-next-line  react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const cb = async () => {
            if (token) {
                try {
                    setLoading(true);
                    const resp = await userService.getProfile(token);
                    setProfile({ ...resp.data.data, password: "" });
                    if (resp) {
                        setIsLoggedIn(true);
                    } else {
                        setIsLoggedIn(false);
                    }
                } catch (e) {
                    setIsLoggedIn(false);
                } finally {
                    setLoading(false);
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
        validUser,
        resetAppState
    };

    return <AppContext.Provider value={AppContextData}>{props.children}</AppContext.Provider>
}