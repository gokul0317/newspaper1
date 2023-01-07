import { useAppContext } from '../../ContextAPI/AppContext';

export default function BlockUnAuth({ children }) {
    const { isLoggedIn } = useAppContext();
    console.log(isLoggedIn ? "Access to view" : "Blocked from viewing");
    return isLoggedIn ? children : null;
}
