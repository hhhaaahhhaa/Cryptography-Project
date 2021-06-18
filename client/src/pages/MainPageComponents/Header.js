import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import { authContext, keyContext } from "../../context/authContext";
import mainContext from "../../context/mainContext";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        width: "100%",
        height: "48px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#323233",
        color: "white",
    },
    fill: {
        flexGrow: 1,
    },
    tabButton: {
        height: "32px",
        width: "75px",
        padding: "0px",
        marginLeft: theme.spacing(2),
    },
    tabFocus: {
        color: "white",
        backgroundColor: "#303F9F",
        "&:hover": { backgroundColor: "#303F9F" },
    },
    logout: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
}));

function Header() {
    const classes = useStyles();
    const { user, logout } = useContext(authContext);
    const { clearKeys } = useContext(keyContext);
    const { mode, setMode } = useContext(mainContext);

    return (
        <div className={classes.mainContainer}>
            <Button
                variant="contained"
                size="small"
                className={clsx(classes.tabButton, {
                    [classes.tabFocus]: mode === "search",
                })}
                disableRipple={true}
                onClick={() => setMode("search")}
            >
                Search
            </Button>
            <Button
                variant="contained"
                size="small"
                className={clsx(classes.tabButton, {
                    [classes.tabFocus]: mode === "upload",
                })}
                disableRipple={true}
                onClick={() => setMode("upload")}
            >
                Upload
            </Button>
            <div className={classes.fill}></div>
            <p style={{ fontSize: "16px", fontWeight: 700 }}>{user}</p>
            <Button
                variant="contained"
                size="small"
                className={clsx(classes.tabButton, classes.logout)}
                disableRipple={true}
                onClick={() => {
                    logout();
                    clearKeys();
                }}
            >
                Log out
            </Button>
        </div>
    );
}

export default Header;
