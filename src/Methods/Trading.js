import {Web3} from "web3";

const Trading = {
    upLoadEmployeeIpfs: function () {
        const geerliWS = "HTTP://127.0.0.1:7545"//以太坊节点的链接
        var web3 = new Web3(geerliWS);//创建web3的实例
        const abcContract = new web3.eth.Contract([
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "hash",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "ID",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "user",
                        "type": "string"
                    }
                ],
                "name": "registerResume",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256[]",
                        "name": "a",
                        "type": "uint256[]"
                    }
                ],
                "name": "peoplecount",
                "outputs": [
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "pure",
                "type": "function"
            }
        ], "0xe61722eB6717708405237F13e21Da027898f2BB8");//第一个参数放合约的abi，第二个参数放合约地址（Remix里面），创建好智能合约实例
        abcContract.registerResume('a', 'b', 'c', {from: 0x15c7b9aEE2aC9232895456DE476624Fc6f91De29})
            .then((ult) => {
                // 处理函数调用的结果
                console.log("result");
            })
            .catch((error) => {
                // 处理错误
                console.error(error);
            });
    },
}
export default Trading;