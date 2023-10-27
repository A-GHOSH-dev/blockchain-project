// blockchain.js
const { Web3 } = require('web3');
const web3 = new Web3('http://127.0.0.1:7545'); // Replace with your Ethereum node URL

const abi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"userAddress","type":"address"},{"indexed":false,"internalType":"string","name":"name","type":"string"}],"name":"UserRegistered","type":"event"},{"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"registerUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"}]; // Your UserRegistrationContract ABI
const address = '0x1c17232fE9E853f7C8876Ed55A64a67061894f3A'; // Your UserRegistrationContract address
const contract = new web3.eth.Contract(abi, address);

// Function to register a user
async function registerUser(userAddress, name) {
  const accounts = await web3.eth.getAccounts();
  const gas = await contract.methods.registerUser(name).estimateGas({ from: accounts[0] });

  const result = await contract.methods.registerUser(name).send({
    from: accounts[0],
    gas,
  });

  return result;
}

module.exports = { registerUser };
