
export function useTokenLocalStorage() {
  const KEY = "token";
  const addToken = (value) => {
    localStorage.setItem(KEY, value);
  }
  const getToken = () => {
    const token = localStorage.getItem(KEY);
    return token;
  }

  const removeToken = () => {
    localStorage.removeItem(KEY);
  }

  return {
    addToken,
    getToken,
    removeToken
  }
}
