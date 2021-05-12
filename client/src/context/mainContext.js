import { String } from "core-js";
import { createContext } from "react";

const mainContext = createContext({
    mode: String,
    setMode: () => {},
});

export default mainContext;
