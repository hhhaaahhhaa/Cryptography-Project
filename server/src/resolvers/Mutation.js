const { f, rand } = require("../functions/F");
const G = require("../functions/G");
const { AES_encrypt } = require("../functions/aes");
const { User } = require("../model/User");
const { BitSet } = require("bitset");
const seedrandom = require("seedrandom");

const Mutation = {
    createKey: async (parent, { keys, uid }) => {
        try {
            const user = await User.findOne({ uid }, { metadatas: 1 });
            keys.forEach((ele) => {
                let f_kf = f("11579208923731619542357098500868", ele);
                let rng = seedrandom(0xada);
                let r = rand(rng);
                let iw = new BitSet("100");
                let idx_MGF1 = iw.xor(G(r));
                idx_MGF1 = idx_MGF1.toString(2);
                let enc_r = AES_encrypt(
                    r.toString(),
                    "92748097864525839647296489438923"
                );
                user.metadatas.push({ f_kf, idx_MGF1, enc_r });
            });
            await user.save();
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    createUser: async (parent, { uid }) => {
        try {
            const userExist = await User.findOne({ uid });
            if (userExist) throw new Error("User already exist");

            const user = new User({
                uid,
                datas: [],
                metadatas: [],
            });
            const saveMessage = await user.save(); //when fail its goes to catch
            console.log(
                saveMessage.uid + "'s data saved to Crypto collection."
            );
            return saveMessage._id;
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    createData: async (parent, { data, uid }) => {
        try {
            const user = await User.findOne(
                { uid },
                { datas: 1, data_count: 1 }
            );
            user.datas.push({
                enc_content: AES_encrypt(
                    data,
                    "19273847567432794847016283567825"
                ),
            });
            user.data_count += 1;
            await user.save();
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    },
};
module.exports.Mutation = Mutation;
