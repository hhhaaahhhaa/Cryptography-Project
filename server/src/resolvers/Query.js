const { f, rand } = require("../functions/F");
const G = require("../functions/G");
const { AES_encrypt, AES_decrypt } = require("../functions/aes");
const { User } = require("../model/User");

const Query = {
    search_s1: async (parent, { keywords, uid }) => {
        try {
            // find matched metadatas
            const user = await User.findOne({ uid }, { metadatas: 1 });
            let enc_rs = [];
            keywords.forEach((ele) => {
                let result = user.metadatas.find(({ f_kf }) => f_kf === ele);
                if (result) {
                    enc_rs.push(result.enc_r);
                }
            });
            return enc_rs;
            // return enc_rs;
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    search_s2: async (parent, { keywordRands, enc_rs, uid }) => {
        try {
            // decrypt Iw
            const user = await User.findOne(
                { uid },
                { metadatas: 1, datas: 1, data_count: 1 }
            );

            let idxs = 0;
            for (let i = 0; i < enc_rs.length; i++) {
                let result = user.metadatas.find(
                    ({ enc_r }) => enc_rs[i] === enc_r
                );
                let idx = result.idx_MGF1 ^ G(keywordRands[i]);
                idxs |= idx;
            }
            idxs = idxs.toString(2);
            let l = idxs.length;
            let enc_data = [];
            for (let j = 0; j < l; j++) {
                if (idxs[j] === "1") {
                    enc_data.push(
                        user.datas[j + user.data_count - l].enc_content
                    );
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
