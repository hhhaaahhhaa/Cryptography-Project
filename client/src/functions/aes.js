const { createCipheriv, createDecipheriv } = require("crypto");
const alg = "aes-256-cbc";
const iv = new Uint8Array(16);
function AES_encrypt(plaintext, key) {
  // Creating Cipheriv with its parameter
  let cipher = createCipheriv(alg, key, iv);
  // Updating text
  let encrypted = cipher.update(plaintext);
  // Using concatenation
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  // Returning encrypted data
  return encrypted.toString("hex");
}

// A decrypt function
function AES_decrypt(ciphertext, key) {
  let encryptedText = Buffer.from(ciphertext, "hex");

  // Creating Decipher
  let decipher = createDecipheriv(alg, key, iv);

  // Updating encrypted text
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  // returns data after decryption
  return decrypted.toString();
}

module.exports.AES_encrypt = AES_encrypt;
module.exports.AES_decrypt = AES_decrypt;
// var key = randomBytes(32);
// var plaintext = "This is what i want to encrypt";
// var enc = AES_encrypt(plaintext, key);
// var dec = AES_decrypt(enc, key);
// console.log(enc);
// console.log(dec);
