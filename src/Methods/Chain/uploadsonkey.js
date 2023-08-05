const Uploadsonkey = function (walletAddressOfCA,xs, ms, ps, userid) {
    return new Promise((resolve, reject) => {
        console.log("@",walletAddressOfCA,xs,ms,ps,userid);
        let Web3 = require("web3");
        let web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
        let abi = [
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "company",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "ownuser",
                        "type": "address"
                    }
                ],
                "name": "givenpower",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
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
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "fedback",
                        "type": "string"
                    }
                ],
                "name": "givenpowerresult",
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
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "fedback",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "key",
                        "type": "uint256"
                    }
                ],
                "name": "tryget",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "company",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "ownuser",
                        "type": "address"
                    }
                ],
                "name": "trygetkey",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "ps",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ms",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "xs",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "userid",
                        "type": "string"
                    }
                ],
                "name": "upload_sonkey",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "fedback",
                        "type": "string"
                    }
                ],
                "name": "uploadkeysfedback",
                "type": "event"
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
                "name": "addtoid",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
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
                "inputs": [
                    {
                        "internalType": "uint256[]",
                        "name": "m_t",
                        "type": "uint256[]"
                    }
                ],
                "name": "divresult",
                "outputs": [
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "pure",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "a",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "p",
                        "type": "uint256"
                    }
                ],
                "name": "invmod",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "pure",
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
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "p",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "m",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "a",
                        "type": "uint256[]"
                    }
                ],
                "name": "verify_recover",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "pure",
                "type": "function"
            }
        ];
        let contractAddress = '0xF97CA4a5187bBd66767d5bFef32D29812b17D9be';
        let myContract = new web3.eth.Contract(abi, contractAddress);
        myContract.methods.upload_sonkey(Number(xs), Number(ms), Number(ps), userid)
            .send({from: walletAddressOfCA, gas: 1000000})
            .on('receipt', function (receipt) {
                myContract.getPastEvents('uploadkeysfedback', {
                    toBlock: 'latest'
                }, function (error, events) {
                    resolve(events[0].returnValues.fedback);
                }).then()
                // myContract.getPastEvents('ResultX',{fromBlock: 'latest'})
                //     .on('ResultX', function (event) {
                //         console.log(event);
                //         const result = event.ResultX.resultfedback;
                //         resolve(result); // 使用 resolve 返回结果
                //     }).on('error', function (error) {
                //     reject(error); // 使用 reject 返回错误
                // });
            })
            .catch((error) => {
                reject(error); // 处理发送交易错误
            });
    });

}

export default Uploadsonkey;