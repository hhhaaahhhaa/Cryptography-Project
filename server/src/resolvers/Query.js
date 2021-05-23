const { f, rand } = require("../functions/F");
const { G } = require("../functions/G");
const { AES_encrypt, AES_decrypt } = require("../functions/aes");
const { User } = require("../model/User");
const { BitSet } = require("bitset");

const Query = {
  search_keyword: async (parent, { keywords, uid }) => {
    try {
      // find matched metadatas
      const user = await User.findOne({ uid }, { metadatas: 1 });
      let i_xor_g = [];
      let e_g_r = [];
      let index = [];
      keywords.forEach((ele) => {
        let result = user.metadatas.find(({ f_kf }, idx) => {
          if (f_kf === ele) {
            index.push(idx);
          }
          return f_kf === ele;
        });
        if (result) {
          i_xor_g.push(result.idx_MGF1);
          e_g_r.push(result.enc_r);
        } else {
          i_xor_g.push("not-found");
          e_g_r.push("not-found");
        }
      });
      return { i_xor_g, e_g_r };
      // return enc_rs;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  search_s1: async (parent, { keywords, uid }) => {
    try {
      // find matched metadatas
      const user = await User.findOne({ uid }, { metadatas: 1 });
      let enc_rs = [];
      let index = [];
      keywords.forEach((ele) => {
        let result = user.metadatas.find(({ f_kf }, idx) => {
          if (f_kf === ele) {
            index.push(idx);
          }
          return f_kf === ele;
        });
        if (result) {
          enc_rs.push(result.enc_r);
        }
      });
      return { enc_rs, index };
      // return enc_rs;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  search_s2: async (parent, { keywordRands, index, uid }) => {
    try {
      // decrypt Iw
      const user = await User.findOne(
        { uid },
        { metadatas: 1, datas: 1, data_count: 1 }
      );

      console.log(keywordRands);
      console.log(index);

      let idxs = new BitSet(0);
      for (let i = 0; i < keywordRands.length; i++) {
        console.log("i_xor_g", user.metadatas[index[i]].idx_MGF1);
        let idx_MGF1 = new BitSet(user.metadatas[index[i]].idx_MGF1);

        console.log("g_r", keywordRands[i], G(keywordRands[i]).toString(2));

        let idx = idx_MGF1.xor(G(keywordRands[i]));

        console.log(idx.toString(2));
        idxs = idxs.xor(idx);
      }
      idxs = idxs.toString(2);
      let l = idxs.length;
      let enc_data = [];
      console.log(idxs);
      for (let j = 0; j < l; j++) {
        if (idxs[j] === "1") {
          console.log(j , l - j - 1, user.datas[l - j - 1].enc_content);
          enc_data.push(user.datas[l - j - 1].enc_content);
        }
      }
      return enc_data;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};
module.exports.Query = Query;
