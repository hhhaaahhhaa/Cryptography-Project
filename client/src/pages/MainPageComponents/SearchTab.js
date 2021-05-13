import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import SearchBar from "./SearchTabComponents/SearchBar";
import TextWindow from "./SearchTabComponents/TextWindow";

import bg from "../../icons/background2.jpg";

import { authContext } from "../../context/authContext";
import { SEARCH_S1_QUERY, SEARCH_S2_QUERY } from "../../graphql/search";
import { f } from "../../functions/F";
import { G } from "../../functions/G";
import { AES_encrypt, AES_decrypt } from "../../functions/aes";
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
    const [ciphertext, setCiphertext] = useState("c");
    const [plaintext, setPlaintext] = useState("p");
    const [search_s1, { loading: load1, data: data1 }] =
        useLazyQuery(SEARCH_S1_QUERY);
    const [search_s2, { loading: load2, data: data2 }] =
        useLazyQuery(SEARCH_S2_QUERY);

    let k_f = "11579208923731619542357098500868";
    let k_M = "19273847567432794847016283567825";
    let k_eps = "92748097864525839647296489438923";

    useEffect(() => {
        decrypt_r();
        return () => {};
    }, [data1]);

    useEffect(() => {
        decrypt_data();
        return () => {};
    }, [data2]);

    const search = async (keywords) => {
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

    return (
        <div className={classes.root}>
            <SearchBar searchFunc={search}></SearchBar>
            <div style={{ display: "flex", flexGrow: 1 }}>
                <TextWindow
                    ciphertext={ciphertext}
                    plaintext={plaintext}
                ></TextWindow>
            </div>
            <div className={classes.footBar}>
                <p
                    style={{
                        color: "white",
                        fontSize: "16px",
                    }}
                >
                    1/1
                </p>
            </div>
        </div>
    );
}

export default SearchTab;
