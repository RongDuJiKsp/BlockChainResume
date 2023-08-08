const Uploadsonkey = function (walletAddressOfCA,xs, ms, ps, userid) {
    return new Promise((resolve, reject) => {
        console.log("@",walletAddressOfCA,xs,ms,ps,userid);

        let Web3 = require("web3");
        let web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
        let abi =[
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
                        "name": "status",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "skey",
                        "type": "uint256"
                    }
                ],
                "name": "end",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "companyadd",
                        "type": "address"
                    }
                ],
                "name": "givepower",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "userid",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "encodehash",
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
                        "name": "userid",
                        "type": "string"
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
                        "name": "psp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "msp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "xsp",
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
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "encodehash",
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
                "name": "uploadresume",
                "outputs": [],
                "stateMutability": "nonpayable",
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
                "name": "resumenumber",
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
        let contractAddress = '0x116E1e29CD9301e50f1d7224C0C2D3D41BEE0805';
        let myContract = new web3.eth.Contract(abi, contractAddress);
        myContract.methods.upload_sonkey(ps,xs,ms,userid)
            .send({from: walletAddressOfCA, gas: 1000000})
            .on('receipt', function (receipt) {
                myContract.getPastEvents('ResultX', {
                    toBlock: 'latest'
                }, function (error, events) {
                    resolve(events[0].returnValues);
                }).then()
            })
            .catch((error) => {
                reject(error); // 处理发送交易错误
            });
    });

}

export default Uploadsonkey;