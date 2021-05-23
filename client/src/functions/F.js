const seedrandom = require("seedrandom");

const MAX = 32767;
function rand(rng = Math.random) {
  return Math.floor(rng() * (MAX + 1));
}

function string_to_integer_truncate(str) {
  let length = str.length;
  if (length > 4) {
    length = 4;
  }

  let number = new Uint32Array(1);
  for (let i = 0; i < length; i++) {
    number[0] |= str.charCodeAt(i) << (4 * i);
  }
  return number[0];
}

function f(k_f, w) {
  let k_f_numeric = string_to_integer_truncate(k_f);
  let w_numeric = string_to_integer_truncate(w);

  let rng = seedrandom(w_numeric);
  let rv = new Uint32Array(1);
  rv[0] = rand(rng);
  rv[0] ^= k_f_numeric;
  return rv[0];
}
module.exports.f = f;
module.exports.rand = rand;
