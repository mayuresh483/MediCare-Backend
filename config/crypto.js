const crypto = require('crypto');

const algorithm = process.env._ALGORITHM;
const key = process.env._KEY;
const iv = process.env._IV;
module.exports = {
    encrypt: (text) => {
        let cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
        return encrypted;
    },

    decrypt: (encryptedText) => {
        let decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8') + decipher.final('utf8');
        return decrypted.toString();
    }
}
