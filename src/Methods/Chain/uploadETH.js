const UploadETHresume = function (walletAddressOfCA, walletAddressOfUser, userID, fileHashBys) {
    return new Promise((resolve, reject) => {
        let Web3 = require("web3");
        let web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
        let abi = [];
        let contractAddress = '0x7242CC17cDda34Af23409B6D829ce991162729A0';
        let myContract = new web3.eth.Contract(abi, contractAddress);
        myContract.methods.signPASS(walletAddressOfCA, userID, fileHashBys, walletAddressOfUser)
            .send({from: walletAddressOfUser, gas: 100000000})
            .on('receipt', function (receipt) {
                myContract.events.DataReturned({fromBlock: 'latest'})
                    .on('ResultX', function (event) {
                        const result = event.ResultX.resultfedback;
                        resolve(result); // 使用 resolve 返回结果
                    }).on('error', function (error) {
                    reject(error); // 使用 reject 返回错误
                });
            })
            .catch((error) => {
                reject(error); // 处理发送交易错误
            });
    });

}

export default UploadETHresume;