const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'});
//参数暂时不要填写
//传入要上传到IPFS的文件的字节流
exports.add = (buffer) => {
    return new Promise((resolve, reject) => {
        try {
            ipfs.add(buffer, function (err, files) {
                if (err || typeof files == "undefined") {
                    reject(err);
                } else {
                    resolve(files[0].hash);
                    //这就是上传IPFS后返回的hash值
                }
            })
        } catch (ex) {
            reject(ex);
        }
    })
}
//传入文件的hash地址
exports.get = (hash) => {
    return new Promise((resolve, reject) => {
        try {
            ipfs.get(hash, function (err, files) {
                if (err || typeof files == "undefined") {
                    reject(err);
                } else {
                    //这个函数为下载文件对象的函数，传入字节流：(files[0].content);
                    resolve('ok');
                }
            })
        } catch (ex) {
            reject(ex);
        }
    });
}