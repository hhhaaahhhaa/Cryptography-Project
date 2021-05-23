import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(0, 2, 0, 2),
  },
  paperContainer: {
    height: "100%",
    width: "50%",
    overflowY: "auto",
  },
}));

function TextWindow(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Box className={classes.root}>
        <Paper
          className={classes.paperContainer}
          style={{ marginRight: "8px" }}
        >
          <p style={{ textAlign: "left", margin: "8px" }}>[Ciphertext]</p>
          <p style={{ textAlign: "left", margin: "8px" }}>{props.ciphertext}</p>
        </Paper>
        <Paper className={classes.paperContainer} style={{ marginLeft: "8px" }}>
          <p style={{ textAlign: "left", margin: "8px" }}>[Plaintext]</p>
          <p style={{ textAlign: "left", margin: "8px" }}>{props.plaintext}</p>
        </Paper>
      </Box>
    </React.Fragment>
  );
}

export default TextWindow;
