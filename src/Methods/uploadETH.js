const UploadETHresume = function (
    cryptHash, //'简历加密后的hash'
    id,//'身份ID
    ethAddress//'ETH私钥对应的地址'
) {
    const Web3 = require("web3");
    const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
    const abi = [
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
    ];
    const contractAddress = '0x7242CC17cDda34Af23409B6D829ce991162729A0';
    const myContract = new web3.eth.Contract(abi, contractAddress);

    myContract.methods.registerResume(cryptHash,id,ethAddress)
        .send({ from: ethAddress,gas:"1000000"}).on('receipt', function(receipt) {
    })

}
export default UploadETHresume;