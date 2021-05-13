const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
    enc_content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const MetaDataSchema = new mongoose.Schema({
    f_kf: {
        type: Number,
        required: true,
    },
    idx_MGF1: {
        type: String,
        required: true,
    },
    enc_r: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const UserSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true,
    },
    datas: [DataSchema],
    data_count: {
        type: Number,
        default: 0,
    },
    metadatas: [MetaDataSchema],
    date: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model("User", UserSchema);
module.exports.User = User;
