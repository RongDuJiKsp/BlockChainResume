import {ConfigEnum} from "../Data/enums";

const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI({host: 'localhost', port: ConfigEnum.IPFSSystemPort, protocol: 'http'});
//参数暂时不要填写

export const upordownloadIPFS = {
    //传入文件的hash地址
    get: (hash) => {
        return new Promise((resolve, reject) => {
            try {
                ipfs.get(hash, function (err, files) {
                    if (err || typeof files == "undefined") {
                        reject(err);
                    } else {
                        //这个函数为下载文件对象的函数，传入字节流：(files[0].content);
                        resolve(files[0]);
                    }
                })
            } catch (ex) {
                reject(ex);
            }
        });
    },
    add: (buffer) => {
        //传入要上传到IPFS的文件的字节流
        return new Promise((resolve, reject) => {
            try {
                console.log("$ 正在进行上传");
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
}