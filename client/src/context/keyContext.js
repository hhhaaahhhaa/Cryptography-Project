import { String } from "core-js";
import { createContext } from "react";

const keyContext = createContext({
    k_f: String,
    setF: () => {},
    k_M: String,
    setM: () => {},
    k_eps: String,
    setEPS: () => {},
});

export default keyContext;
