import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        width: "50%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    searchBarContainer: {
        height: "15%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    searchBar: {
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
        padding: "0px 24px 24px 24px",
    },
    paperContainer: {
        height: "100%",
        width: "100%",
        overflowY: "auto",
    },
}));

function LeftWindow() {
    const classes = useStyles();
    const [searchStr, setSearchStr] = useState("");
    const [ciphertext, setCiphertext] = useState("[ciphertext]");

    const search = (e) => {
        setSearchStr(e.target.value);
    };

    return (
        <React.Fragment>
            <Box className={classes.mainContainer}>
                <Box className={classes.searchBarContainer}>
                    <div style={{ display: "flex", width: "80%" }}>
                        <input
                            id="searchBar"
                            className={classes.searchBar}
                            placeholder="Search files or tags"
                            onChange={search}
                            value={searchStr}
                        />
                    </div>
                    <IconButton
                        classes={{
                            root: classes.nopad,
                        }}
                        style={{ backgroundColor: "white" }}
                        size="small"
                    >
                        <SearchIcon />
                    </IconButton>
                </Box>
                <Box className={classes.viewContainer}>
                    <Paper className={classes.paperContainer}>
                        <p style={{ textAlign: "left", margin: "8px" }}>
                            {ciphertext}
                        </p>
                    </Paper>
                </Box>
            </Box>
        </React.Fragment>
    );
}

export default LeftWindow;
