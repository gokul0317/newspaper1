import { useAppContext } from '../../ContextAPI/AppContext';

export default function BlockUnAuth({ children }) {
  console.log("Blocked from viewing");
  const { isLoggedIn } = useAppContext();
  return isLoggedIn ? children : null;
  
}
