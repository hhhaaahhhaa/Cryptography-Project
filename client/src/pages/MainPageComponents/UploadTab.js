import React, { useContext, useEffect, useState } from "react";
import BitSet from "bitset";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import KeywordBar from "./UploadTabComponents/KeywordBar";

import bg from "../../icons/background2.jpg";

import { SEARCH_KEYWORD_QUERY, UPLOAD_FILE_MUTATE } from "../../graphql/database";
import { k_f, k_M, k_eps } from "../../config";
import { AES_encrypt, AES_decrypt } from "../../functions/aes";
import { f } from "../../functions/F";
import { G } from "../../functions/G";
import { authContext } from "../../context/authContext";
const { useLazyQuery, useMutation } = require("@apollo/client");

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
    const [chipData, setChipData] = useState([]);
    const [file, updFile] = useState();
    const [content, updContent] = useState();
    const [search_s1, { loading: load1, data: data1 }] = useLazyQuery(
        SEARCH_KEYWORD_QUERY
    );
    const [create_data, { loading: load2, data: file_index }] = useMutation(
        UPLOAD_FILE_MUTATE
    );
    
    // useEffect(() => {
    //     search_return();
    //     return () => {};
    // }, [data1]);

    // useEffect(() => {
    //     upload_return();
    //     return () => {};
    // }, [file_index]);

    const chooseFile = (file) => {
        updFile(file);
        const reader = new FileReader();
        reader.addEventListener("load", (event) => {
            updContent(event.target.result);
            // console.log(event.target.result);
        });
        reader.readAsText(file);
    };


    // const upload_return = async () => {

    // };

    // const search_return = async () => {
    //     // decrypt r

    // };

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

    const upload = async (keywords) => {
        await create_data({
            variables: {
                uid: "0",
                data: AES_encrypt(content, k_M),
            },
        });
    };


    const uploadContent = async () => {
        try {
            await search(chipData);
            await upload(content);

            if (data1 && file_index) {
                console.log(data1.search_keyword);

                let g_r = data1.search_keyword.e_g_r.map((element) => {
                    return parseInt(AES_decrypt(element, k_eps));
                });
    
                let index_bitsets = data1.search_keyword.i_xor_g.map((the, i) => {
                    let i_xor_g_r = new BitSet(the);
                    return i_xor_g_r.xor(G(g_r[i]));
                });
                
                console.log(file_index);

                let update_bitsets = index_bitsets.map((the) => {
                    console.log("orginal:", the.toString(2));
                    the[the.length - file_index] = 1;
                    console.log("after:  ", the.toString(2));
                });
            }
        } catch(err) {
            console.log(err);
        }
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
                <KeywordBar 
                    chipData={chipData} 
                    setChipData={setChipData}>
                </KeywordBar>
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
