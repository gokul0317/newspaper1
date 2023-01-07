import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../ContextAPI/AppContext";

const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAppContext()

    const checkUserToken = useCallback(() => {
        const unAuthpaths =  ["/login", "/register"];
        const authPaths =  ["/profile", "/news", "/add/news", "/bookmarks"];
        const { pathname } = window.location;
        const isUnAuthPaths = unAuthpaths.find((path) => path === pathname);
        const isAuthPaths = authPaths.find((path) => path === pathname);
        if (isLoggedIn && !isAuthPaths) {
            // If user logged in blocks login and register pages
            return navigate("/");
        } else if (!isLoggedIn && !isUnAuthPaths) {
            // If user not logged in blocks auth pages
            return navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        checkUserToken();
    }, [checkUserToken]);

    return (
        <>
            {
                props.children
            }
        </>
    );
}
export default ProtectedRoute;