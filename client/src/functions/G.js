const forge = require("node-forge");

const mgf1 = forge.mgf.mgf1.create(forge.md.sha256.create());

function G(r) {
  const seed = r.toString();
  const maskLen = 8;
  let str = mgf1.generate(seed, maskLen);

  let rv = new Uint32Array(1);
  for (let i = 0; i < str.length; i++) {
    rv[0] |= str.charCodeAt(i) << (4 * i);
  }
  return rv[0];
}

module.exports.G = G;
