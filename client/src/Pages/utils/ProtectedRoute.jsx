import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../ContextAPI/AppContext";

const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAppContext()

    const checkUserToken = React.useCallback(() => {
        const unAuthpaths =  ["/login", "/register"];
        const authPaths =  ["/profile"];
        const { pathname } = window.location;
        const isUnAuthPaths = unAuthpaths.find((path) => path === pathname);
        const isAuthPaths = authPaths.find((path) => path === pathname);
        console.log(isUnAuthPaths, isAuthPaths, pathname,  "pathname")
        if (isLoggedIn && !isAuthPaths) {
            return navigate("/");
        } else if (!isLoggedIn && !isUnAuthPaths) {
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