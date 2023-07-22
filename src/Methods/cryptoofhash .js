import {SM4} from "gm-crypto";

export default function cryptoofhash(randomKey, hash) {
    const {SM4} = require('gm-crypto')

    const key = randomKey // 传入对应随机数参数 Any string of 32 hexadecimal digits
    const originalData = hash//传入简历文件上传到ipfs系统后得到的hash值
    let encryptedData, decryptedData

    encryptedData = SM4.encrypt(originalData, key, {
        inputEncoding: 'utf8',
        outputEncoding: 'base64'
    })
//加密
//加密后返回 密文传入web3上链函数参数，存储在区块链上


    decryptedData = SM4.decrypt(encryptedData, key, {
        inputEncoding: 'base64',
        outputEncoding: 'utf8'
    })
//解密

}


