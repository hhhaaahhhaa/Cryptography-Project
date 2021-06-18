import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeTwoToneIcon from "@material-ui/icons/NavigateBeforeTwoTone";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import SearchBar from "./SearchTabComponents/SearchBar";
import TextWindow from "./SearchTabComponents/TextWindow";

import bg from "../../icons/background2.jpg";

import { authContext, keyContext } from "../../context/authContext";
import { SEARCH_S1_QUERY, SEARCH_S2_QUERY } from "../../graphql/database";
import { f } from "../../functions/F";
import { G } from "../../functions/G";
import { AES_encrypt, AES_decrypt } from "../../functions/aes";
import { cipher } from "node-forge";
// import { k_f, k_M, k_eps } from "../../config";
const { useLazyQuery } = require("@apollo/client");

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
    },
    footBar: {
        display: "flex",
        height: "32px",
        justifyContent: "center",
        alignItems: "center",
    },
}));

function SearchTab() {
    const classes = useStyles();
    const { user } = useContext(authContext);
    const { k_f, k_M, k_eps } = useContext(keyContext);
    const [ciphertext, setCiphertext] = useState("");
    const [plaintext, setPlaintext] = useState("");
    const [idxShow, setIdxShow] = useState(0);
    const [search_s1, { loading: load1, data: data1 }] =
        useLazyQuery(SEARCH_S1_QUERY);
    const [search_s2, { loading: load2, data: data2 }] =
        useLazyQuery(SEARCH_S2_QUERY);

    useEffect(() => {
        decrypt_r();
        return () => {};
    }, [data1]);

    useEffect(() => {
        decrypt_data();
        return () => {};
    }, [data2]);

    const search = async (keywords) => {
        setIdxShow(0);
        // encrypt keywords
        keywords = keywords.map((ele) => {
            return f(k_f, ele);
        });

        // fetch encrypted r
        await search_s1({
            variables: {
                keywords,
                uid: "0",
            },
        });
    };

    const decrypt_r = async () => {
        // decrypt r
        let r = [];
        if (data1) {
            data1.search_s1.enc_rs.forEach((element) => {
                r.push(parseInt(AES_decrypt(element, k_eps)));
            });
            if (r) {
                // send r
                // fetch encrypted data
                console.log({
                    keywordRands: r,
                    index: data1.search_s1.index,
                    uid: "0",
                });
                await search_s2({
                    variables: {
                        keywordRands: r,
                        index: data1.search_s1.index,
                        uid: "0",
                    },
                });
            }
        }
    };

    const decrypt_data = async () => {
        // decrypt data
        let plaintexts = [];
        if (data2) {
            setCiphertext(data2.search_s2);
            data2.search_s2.forEach((ele) => {
                plaintexts.push(AES_decrypt(ele, k_M));
            });
            setPlaintext(plaintexts);
        }
    };

    // change showing idx
    const showNext = () => {
        if (idxShow + 1 === ciphertext.length) {
            setIdxShow(0);
        } else {
            setIdxShow(idxShow + 1);
        }
    };

    const showPrev = () => {
        if (idxShow === 0) {
            setIdxShow(ciphertext.length - 1);
        } else {
            setIdxShow(idxShow - 1);
        }
    };

    return (
        <div className={classes.root}>
            <SearchBar searchFunc={search}></SearchBar>
            <div style={{ display: "flex", flexGrow: 1 }}>
                <TextWindow
                    ciphertext={
                        ciphertext.length > 0 ? ciphertext[idxShow] : ""
                    }
                    plaintext={plaintext.length > 0 ? plaintext[idxShow] : ""}
                ></TextWindow>
            </div>
            <div className={classes.footBar}>
                <IconButton
                    size="small"
                    onClick={() => () => showPrev()}
                    disabled={ciphertext.length === 0}
                >
                    <NavigateBeforeTwoToneIcon
                        style={{ fill: "white" }}
                        color="inherit"
                    />
                </IconButton>
                <p
                    style={{
                        color: "white",
                        fontSize: "16px",
                    }}
                >
                    {ciphertext.length === 0 ? 0 : idxShow + 1}/
                    {ciphertext.length}
                </p>
                <IconButton
                    size="small"
                    onClick={() => showNext()}
                    disabled={ciphertext.length === 0}
                >
                    <NavigateNextIcon
                        style={{ fill: "white" }}
                        color="inherit"
                    />
                </IconButton>
            </div>
        </div>
    );
}

export default SearchTab;
