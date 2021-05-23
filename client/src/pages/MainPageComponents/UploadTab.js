import React, { useContext, useEffect, useState } from "react";
import BitSet from "bitset";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import KeywordBar from "./UploadTabComponents/KeywordBar";

import bg from "../../icons/background2.jpg";

import {
  SEARCH_KEYWORD_QUERY,
  UPLOAD_FILE_MUTATE,
  CREATE_KEY_MUTATE,
  UPDATE_KEY_MUTATE,
} from "../../graphql/database";
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
  const [search_s1, { loading: load1, data: search_results }] =
    useLazyQuery(SEARCH_KEYWORD_QUERY);
  const [create_data, { loading: load2, data: file_index }] =
    useMutation(UPLOAD_FILE_MUTATE);
  const [create_key, { loading: load3, data: create_sucess }] =
    useMutation(CREATE_KEY_MUTATE);
  const [update_key, { loading: load4, data: update_sucess }] =
    useMutation(UPDATE_KEY_MUTATE);

  const chooseFile = (file) => {
    updFile(file);
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      updContent(event.target.result);
    });
    reader.readAsText(file);
  };

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

  const create_key_word = async (keyword) => {
    let getRandomInt = (max) => {
      return Math.floor(Math.random() * max);
    };

    let create_pair = (element) => {
      let f_kf = f(k_f, element);
      let i = new BitSet(0);
      let r = getRandomInt(0xdeadbeef);
      let idx_MGF1 = i.xor(G(r)).toString(2);
      let enc_r = AES_encrypt(r.toString(), k_eps);

      return { f_kf, idx_MGF1, enc_r };
    };
    let new_pair = create_pair(keyword);

    console.log(new_pair);

    await create_key({
      variables: {
        ...new_pair,
        uid: "0",
      },
    });

    return new_pair;
  };

  const update = async (pair) => {
    await update_key({
      variables: {
        ...pair,
        uid: "0",
      },
    });
  };

  const uploadContent = async () => {
    try {
      await search(chipData);

      if (search_results) {
        let i_xor_g = [];
        let e_g_r = [];

        let length = search_results.search_keyword.i_xor_g.length;
        console.log(search_results.search_keyword.i_xor_g);
        for (let i = 0; i < length; i++) {
          if (search_results.search_keyword.i_xor_g[i] === "not-found") {
            console.log("creating", chipData[i]);
            let new_pair = await create_key_word(chipData[i]);
            i_xor_g.push(new_pair.idx_MGF1);
            e_g_r.push(new_pair.enc_r);
          } else {
            i_xor_g.push(search_results.search_keyword.i_xor_g[i]);
            e_g_r.push(search_results.search_keyword.e_g_r[i]);
          }
        }

        await upload(content);

        console.log(i_xor_g);
        console.log(e_g_r);

        let g_r = e_g_r.map((element) => {
          return parseInt(AES_decrypt(element, k_eps));
        });

        let index_bitsets = i_xor_g.map((the, i) => {
          let i_xor_g_r = new BitSet(the);
          return i_xor_g_r.xor(G(g_r[i]));
        });

        let update_bitsets = index_bitsets.map((the, i) => {
          return the.set(file_index, 1).xor(G(g_r[i])).toString(2);
        });

        console.log(g_r);
        console.log(update_bitsets);
        for (let i = 0; i < length; i++) {
          console.log("update", chipData[i]);
          await update({
            f_kf: f(k_f, chipData[i]),
            idx_MGF1: update_bitsets[i],
            enc_r: AES_encrypt(g_r[i].toString(), k_eps),
          });
        }
      }
    } catch (err) {
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
        <KeywordBar chipData={chipData} setChipData={setChipData}></KeywordBar>
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
