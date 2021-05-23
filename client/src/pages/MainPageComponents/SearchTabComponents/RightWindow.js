import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  keyBarContainer: {
    height: "15%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  keyBar: {
    flexGrow: 1,
    fontSize: "20px",
    margin: theme.spacing(1),
    outline: "none",
    padding: "1px 6px",
    borderRadius: "12px",
    borderColor: `${theme.palette.divider}`,
    "&:focus": {
      borderColor: theme.palette.text.primary,
    },
  },
  viewContainer: {
    height: "85%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(0, 3, 0, 1.5),
  },
  paperContainer: {
    height: "100%",
    width: "100%",
    overflowY: "auto",
  },
}));

function RightWindow() {
  const classes = useStyles();
  const [keyStr, setKeyStr] = useState("");
  const [plaintext, setPlaintext] = useState("[plaintext]");

  const keyIn = (e) => {
    setKeyStr(e.target.value);
  };

  return (
    <React.Fragment>
      <Box className={classes.root}>
        <Box className={classes.keyBarContainer}>
          <div style={{ display: "flex", width: "80%" }}>
            <input
              id="keyBar"
              className={classes.keyBar}
              placeholder="Enter the key"
              onChange={keyIn}
              value={keyStr}
            />
          </div>
          <Button variant="contained" color="primary" size="small">
            Decrypt
          </Button>
        </Box>
        <Box className={classes.viewContainer}>
          <Paper className={classes.paperContainer}>
            <p style={{ textAlign: "left", margin: "8px" }}>{plaintext}</p>
          </Paper>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default RightWindow;
