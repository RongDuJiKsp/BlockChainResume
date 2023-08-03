const {SM4} = require('gm-crypto')
const crypto = require("crypto");
const prolongingStrTo32 = (key) => {
    let res = "" + key;
    for (let i = res.length; i < 32; i++) {
        res += "1";
    }
    return res;
}
const CryptoOfHash = {
    prolongingStrTo32: prolongingStrTo32(),
    encryptedData: (originalData//ipfs文件hash
        , key//s
    ) => {
        return SM4.encrypt(originalData, prolongingStrTo32(key), {
            inputEncoding: 'utf8',
            outputEncoding: 'base64'
        })
    },
    decryptedData: (encryptedData//加密后的文件hash
        , key//s
    ) => {
        return SM4.decrypt(encryptedData, prolongingStrTo32(key), {
            inputEncoding: 'base64',
            outputEncoding: 'utf8'
        })
    },
    hashData: (Data) => {
        const hash = crypto.createHash('md5');
        hash.update(Data);
        return hash.digest('hex');
    }
}
export default CryptoOfHash;