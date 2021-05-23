import React, { useState, createContext } from "react";

const authContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

function AuthProvider(props) {
  const [user, setUser] = useState();

  function login(userData) {
    if (userData && userData !== "") {
      setUser(userData);
    }
  }

  function logout() {
    setUser(null);
  }

  return (
    <authContext.Provider value={{ user: user, login, logout }} {...props} />
  );
}

export { authContext, AuthProvider };
