import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import Header from "./MainPageComponents/Header";
import SearchTab from "./MainPageComponents/SearchTab";
import UploadTab from "./MainPageComponents/UploadTab";

import bg from "../icons/background2.jpg";

import mainContext from "../context/mainContext";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
    },
    tabContainer: {
        width: "100vw",
        height: "calc(100% - 48px)",
        display: "flex",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
    },
}));

function MainPage() {
    const classes = useStyles();
    const [mode, setMode] = useState("search");

    return (
        <React.Fragment>
            <CssBaseline />
            <Container
                maxWidth={false}
                disableGutters={true}
                className={classes.root}
            >
                <mainContext.Provider
                    value={{
                        mode,
                        setMode,
                    }}
                >
                    <Header></Header>
                    <div className={classes.tabContainer}>
                        {mode === "search" ? (
                            <SearchTab></SearchTab>
                        ) : (
                            <UploadTab></UploadTab>
                        )}
                    </div>
                </mainContext.Provider>
            </Container>
        </React.Fragment>
    );
}

export default MainPage;
