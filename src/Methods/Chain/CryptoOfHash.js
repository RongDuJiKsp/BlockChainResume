const {SM4} = require('gm-crypto')
const CryptoOfHash = {
    encryptedData: (originalData//ipfs文件hash
        , key//s
    ) => {
        return SM4.encrypt(originalData, key, {
            inputEncoding: 'utf8',
            outputEncoding: 'base64'
        })
    },
    decryptedData: (encryptedData//加密后的文件hash
        , key//s
    ) => {
        return SM4.decrypt(encryptedData, key, {
            inputEncoding: 'base64',
            outputEncoding: 'utf8'
        })
    }
}
export default CryptoOfHash;