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
        <authContext.Provider
            value={{ user: user, login, logout }}
            {...props}
        />
    );
}

const keyContext = createContext({
    k_f: String,
    setF: () => {},
    k_M: String,
    setM: () => {},
    k_eps: String,
    setEPS: () => {},
    clearKeys: () => {},
});

function KeyProvider(props) {
    const [k_f, setF] = useState("");
    const [k_M, setM] = useState("");
    const [k_eps, setEPS] = useState("");

    function clearKeys() {
        setF("");
        setM("");
        setEPS("");
    }

    return (
        <keyContext.Provider
            value={{
                k_f: k_f,
                setF,
                k_M: k_M,
                setM,
                k_eps: k_eps,
                setEPS,
                clearKeys,
            }}
            {...props}
        />
    );
}

export { authContext, keyContext, AuthProvider, KeyProvider };
