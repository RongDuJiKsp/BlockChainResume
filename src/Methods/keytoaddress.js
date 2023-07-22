export default function keytoaddress(privatekey) {
    const Web3 = require("web3");
    const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
    const wallet = web3.eth.accounts.privateKeyToAccount(privatekey);
//上面这行代码是将 你传入的私钥转换为一个钱包对象
    console.log(wallet.address);
//wallet.address 是这个钱包对象的地址
// 这个函数目的是将 ETH私钥转换为对应的钱包地址，钱包地址后续需要跟加密后的hash值一起传进web3上链存储函数。
    return wallet.address;
}