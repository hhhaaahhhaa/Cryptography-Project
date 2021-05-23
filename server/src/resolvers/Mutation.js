const { f, rand } = require("../functions/F");
const G = require("../functions/G");
const { k_f, k_M, k_eps } = require("../config");
const { AES_encrypt } = require("../functions/aes");
const { User } = require("../model/User");
const { BitSet } = require("bitset");
const seedrandom = require("seedrandom");

const Mutation = {
  createKey: async (parent, { f_kf, idx_MGF1, enc_r, uid }) => {
    try {
      const user = await User.findOne({ uid }, { metadatas: 1 });
      user.metadatas.push({ f_kf, idx_MGF1, enc_r });
      await user.save();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  updateKey: async (parent, { f_kf, idx_MGF1, enc_r, uid }) => {
    try {
      let user = await User.findOne({ uid }, { metadatas: 1 });
      user.metadatas.forEach((element) => {
        if (element.f_kf === f_kf) {
          element.idx_MGF1 = idx_MGF1;
          element.enc_r = enc_r;
        }
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
      console.log(saveMessage.uid + "'s data saved to Crypto collection.");
      return saveMessage._id;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  createData: async (parent, { data, uid }) => {
    // the data was encrypted by front-end
    try {
      const user = await User.findOne({ uid }, { datas: 1, data_count: 1 });
      user.datas.push({
        enc_content: data,
      });
      user.data_count += 1;
      await user.save();
      return user.data_count;
    } catch (err) {
      console.log(err);
      return -1;
    }
  },
};
module.exports.Mutation = Mutation;
