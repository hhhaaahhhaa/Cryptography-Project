const forge = require("node-forge");

const mgf1 = forge.mgf.mgf1.create(forge.md.sha256.create());
const { BitSet } = require("bitset");
function G(r) {
    const seed = r.toString();
    const maskLen = 8;
    let str = mgf1.generate(seed, maskLen);
    // let rv = new Uint32Array(1);
    // for (let i = 0; i < str.length; i++) {
    //     rv[0] |= str.charCodeAt(i) << (4 * i);
    // }
    let rv = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
        rv[i] = str.charCodeAt(i);
    }
    let bitstr = new BitSet(rv);
    return bitstr;
}

// var a = G(3351);
// var b = G(3);
// var g = a.xor(b).toString(2);
// var c = new Buffer.from(g);
// // var h = c.toString("base64");
// // var s = new Buffer.from(h, "base64").toString();
// console.log(c);
// console.log(c.toString());
// g = new BitSet(g);
// console.log(g.toString(2));
// console.log(iw);
// console.log(iw ^ G(r));
module.exports = G;
