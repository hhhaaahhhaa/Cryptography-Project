import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import LeftWindow from "./MainPageComponents/LeftWindow";
import RightWindow from "./MainPageComponents/RightWindow";
import { Divider } from "@material-ui/core";

import bg from "../icons/background2.jpg";

const useStyles = makeStyles((theme) => ({
    pageContainer: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
    },
}));

function MainPage() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline />
            <Container
                maxWidth={false}
                disableGutters={true}
                className={classes.pageContainer}
            >
                <LeftWindow></LeftWindow>
                <RightWindow></RightWindow>
            </Container>
        </React.Fragment>
    );
}

export default MainPage;
