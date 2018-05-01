const crypto = require('crypto');
const path = require('path');

const config = require(path.join(__dirname, '../constant/config'));

const ENCRYPTION_KEY = config.Crypto_Key;

function encrypt(plainText) {
    var m = crypto.createHash('md5');
    m.update(ENCRYPTION_KEY);
    var key = m.digest();
    var iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';    
    var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);    
    var encoded = cipher.update(plainText, 'utf8', 'hex');
    encoded += cipher.final('hex');
    return encoded;
};

module.exports = { encrypt };