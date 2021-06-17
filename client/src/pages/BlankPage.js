import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
}));

function BlankPage() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth={false}
        disableGutters={true}
        className={classes.root}
      ></Container>
    </React.Fragment>
  );
}

export default BlankPage;
