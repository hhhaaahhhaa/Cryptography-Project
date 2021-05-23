const { k_f, k_M, k_eps } = require("./config.js");
const { AES_encrypt, AES_decrypt } = require("./functions/aes");
const { f } = require("./functions/F");
const { G } = require("./functions/G");
const BitSet = require("bitset");

    let getRandomInt = (max) => {
            return Math.floor(Math.random() * max);
          };

let i = new BitSet(0);

let r = getRandomInt(0xdeadbeef);
console.log(r);
console.log(G(r).toString(2));

let idx_MGF1 = i.xor(G(r)).toString(2);

console.log(idx_MGF1);


console.log(G(3295657270).toString(2));
