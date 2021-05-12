import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import SearchBar from "./SearchTabComponents/SearchBar";
import TextWindow from "./SearchTabComponents/TextWindow";

import bg from "../../icons/background2.jpg";

import { authContext } from "../../context/authContext";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
    },
    footBar: {
        display: "flex",
        height: "32px",
        justifyContent: "center",
        alignItems: "center",
    },
}));

function SearchTab() {
    const classes = useStyles();
    const { user } = useContext(authContext);
    const [ciphertext, setCiphertext] = useState("c");
    const [plaintext, setPlaintext] = useState("p");

    const search = (keywords) => {
        // encrypt keywords
        // fetch encrypted r
        // decrypt r
        // send r
        // fetch encrypted data
        // decrypt data
        console.log(keywords);
    };

    return (
        <div className={classes.root}>
            <SearchBar searchFunc={search}></SearchBar>
            <div style={{ display: "flex", flexGrow: 1 }}>
                <TextWindow
                    ciphertext={ciphertext}
                    plaintext={plaintext}
                ></TextWindow>
            </div>
            <div className={classes.footBar}>
                <p
                    style={{
                        color: "white",
                        fontSize: "16px",
                    }}
                >
                    1/1
                </p>
            </div>
        </div>
    );
}

export default SearchTab;
