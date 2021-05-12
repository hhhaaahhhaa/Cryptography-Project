import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Chip from "@material-ui/core/Chip";
import { Popover } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
        marginBottom: theme.spacing(2),
        borderRadius: "15px",
    },
    addContainer: {
        height: "90px",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        listStyle: "none",
        margin: 0,
    },
    keywordContainer: {
        height: "60px",
        display: "flex",
        flexWrap: "wrap",
        margin: 0,
        overflowY: "auto",
        borderRadius: "15px",
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    inputBar: {
        height: "24px",
        fontSize: "14px",
        margin: theme.spacing(0.5),
        outline: "none",
        padding: "1px 6px",
        borderRadius: "12px",
        borderColor: `${theme.palette.divider}`,
        "&:focus": {
            borderColor: theme.palette.text.primary,
        },
    },
    alert: {
        width: "256px",
    },
}));

function KeywordBar() {
    const classes = useStyles();
    const [chipData, setChipData] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [anchorEle, setAnchorEle] = useState(null);

    // handle popover message
    const handleClose = () => {
        setAnchorEle(null);
    };
    React.useEffect(() => {
        if (anchorEle) {
            setTimeout(function () {
                setAnchorEle(null);
            }, 1000); //1 Second delay
        }
    }, [anchorEle]);

    // keyword operations
    const updKeyword = (e) => {
        setKeyword(e.target.value);
    };

    const newKeyword = (e) => {
        if (e.key === "Enter" && keyword !== "") {
            try {
                if (chipData.includes(keyword)) {
                    setAnchorEle(document.body);
                    return;
                }
                setChipData([...chipData, keyword]);
                e.target.value = "";
                setKeyword("");
            } catch (err) {
                console.log(err);
            }
        }
    };

    const deleteKeyword = (deleteIndex) => {
        try {
            let chips = chipData.filter((_, index) => index !== deleteIndex);
            setChipData(chips);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.addContainer}>
                <div className={classes.keywordContainer}>
                    {chipData.map((data, index) => {
                        return (
                            <li key={index}>
                                <Chip
                                    size="small"
                                    label={data}
                                    onDelete={() => deleteKeyword(index)}
                                    className={classes.chip}
                                />
                            </li>
                        );
                    })}
                </div>
                <input
                    id="addInputBar"
                    className={classes.inputBar}
                    placeholder="Enter keywords..."
                    onChange={updKeyword}
                    onKeyDown={newKeyword}
                />
                <Popover
                    open={Boolean(anchorEle)}
                    anchorEl={anchorEle}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                >
                    <Alert className={classes.alert} severity="warning">
                        Keyword Already Exists!
                    </Alert>
                </Popover>
            </div>
        </div>
    );
}

export default KeywordBar;
