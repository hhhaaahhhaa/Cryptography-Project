import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import KeywordBar from "./UploadTabComponents/KeywordBar";

import bg from "../../icons/background2.jpg";

import { authContext } from "../../context/authContext";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        display: "flex",
        padding: theme.spacing(1, 2, 1, 2),
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
    },
}));

function UploadTab() {
    const classes = useStyles();
    const { user } = useContext(authContext);
    const [file, updFile] = useState();
    const [content, updContent] = useState();

    const chooseFile = (file) => {
        updFile(file);
        const reader = new FileReader();
        reader.addEventListener("load", (event) => {
            updContent(event.target.result);
            // console.log(event.target.result);
        });
        reader.readAsText(file);
    };

    const uploadContent = () => {
        // encrypt data
        // fetch index
        // decrypt index
        // update index
        // encrypt index
        // upload all
    };

    return (
        <div className={classes.root}>
            <div
                style={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    paddingRight: "8px",
                }}
            >
                <KeywordBar></KeywordBar>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Button
                        variant="contained"
                        component="label"
                        style={{
                            flexGrow: 1,
                            justifyContent: "flex-start",
                            overflowX: "hidden",
                        }}
                    >
                        <input
                            type="file"
                            onChange={(e) => chooseFile(e.target.files[0])}
                        />
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        disableRipple={true}
                        style={{ marginLeft: "8px" }}
                        onClick={() => uploadContent()}
                    >
                        GO!
                    </Button>
                </div>
            </div>
            <div
                style={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: "8px",
                }}
            >
                <p style={{ color: "white" }}>{!file ? 0 : file.size}</p>
            </div>
        </div>
    );
}

export default UploadTab;
