const UploadETHresume = function (walletAddressOfCA, walletAddressOfUser, userID, fileHashBys) {
    return new Promise((resolve, reject) => {
        let Web3 = require("web3");
        let web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
        let abi = [
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "resultfedback",
                        "type": "string"
                    }
                ],
                "name": "ResultX",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "ca",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "userid",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "enhash",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "useradd",
                        "type": "address"
                    }
                ],
                "name": "signPASS",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "enhash",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "userid",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "useradd",
                        "type": "address"
                    }
                ],
                "name": "UploadResume",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "codepower",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "number",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];
        let contractAddress = '0xf997F42d4C4DBC67E2ff298b1DBcdbe5A94C7EcD';
        let myContract = new web3.eth.Contract(abi, contractAddress);
        myContract.methods.signPASS(walletAddressOfCA, userID, fileHashBys, walletAddressOfUser)
            .send({from: walletAddressOfCA, gas: 1000000})
            .on('receipt', function (receipt) {
                myContract.getPastEvents('ResultX', {
                    toBlock: 'latest'
                }, function (error, events) {
                    resolve(events[0].returnValues.resultfedback);
                }).then()
            })
            .catch((error) => {
                reject(error); // 处理发送交易错误
            });
    });

}

export default UploadETHresume;