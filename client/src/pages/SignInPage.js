import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import Button from "@material-ui/core/Button";

import bg from "../icons/background2.jpg";

import { authContext, keyContext } from "../context/authContext";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
    },
    loginContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "stretch",
        backgroundColor: "#9CDCFE",
        borderRadius: "15px",
        padding: "15px",
    },
    link: {
        color: "white",
        "&:visited": {
            color: "#9CDCFE",
        },
    },
}));

function Copyright() {
    const classes = useStyles();
    return (
        <Typography variant="body2" align="center" style={{ color: "white" }}>
            {"Copyright © "}
            <a className={classes.link} href="./">
                Cryptography Spring
            </a>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

function SignInPage() {
    const classes = useStyles();
    const [userID, setUserID] = useState("");
    const { login } = useContext(authContext);
    const { k_f, k_M, k_eps, setF, setM, setEPS, clearKeys } =
        useContext(keyContext);

    const chooseFile = (file) => {
        const reader = new FileReader();
        try {
            reader.addEventListener("load", (event) => {
                let keys = event.target.result.trim().split(" ");
                setF(keys[0]);
                setM(keys[1]);
                setEPS(keys[2]);
                console.log(keys);
            });
            reader.readAsText(file);
        } catch (e) {
            clearKeys();
        }
    };

    const notValidKey = () => {
        if (k_f !== "" && k_M !== "" && k_eps !== "") {
            return false;
        }
        return true;
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Container
                maxWidth={false}
                disableGutters={true}
                className={classes.root}
            >
                <div
                    style={{
                        width: "35%",
                        display: "flex",
                        flexGrow: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div className={classes.loginContainer}>
                        <input
                            placeholder="Username"
                            style={{
                                fontSize: "18px",
                                marginBottom: "8px",
                                borderRadius: "5px",
                                outline: "none",
                            }}
                            onChange={(e) => setUserID(e.target.value)}
                        ></input>
                        <div style={{ display: "flex", marginBottom: "8px" }}>
                            <p
                                style={{
                                    fontSize: "18px",
                                    margin: "0px 8px 0px 0px",
                                }}
                            >
                                Key File:
                            </p>
                            <input
                                type="file"
                                accept=".txt"
                                onChange={(e) => chooseFile(e.target.files[0])}
                            ></input>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={notValidKey() | (userID === "")}
                                disableRipple={true}
                                onClick={() => login(userID)}
                            >
                                LOGIN
                            </Button>
                        </div>
                    </div>
                </div>
                <Copyright></Copyright>
            </Container>
        </React.Fragment>
    );
}

export default SignInPage;
