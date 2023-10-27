// blockchain.js
const { Web3 } = require('web3');
const web3 = new Web3('http://127.0.0.1:7545'); // Replace with your Ethereum node URL

const abi1 = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"userAddress","type":"address"},{"indexed":false,"internalType":"string","name":"name","type":"string"}],"name":"UserRegistered","type":"event"},{"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"registerUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"}]; // Your UserRegistrationContract ABI
const address1 = '0x1c17232fE9E853f7C8876Ed55A64a67061894f3A'; // Your UserRegistrationContract addres
const abi2=[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"challengeId","type":"uint256"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"uint256","name":"startTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endTime","type":"uint256"}],"name":"ChallengeCreated","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"challenges","outputs":[{"internalType":"uint256","name":"challengeId","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"easyLevelTarget","type":"uint256"},{"internalType":"uint256","name":"mediumLevelTarget","type":"uint256"},{"internalType":"uint256","name":"hardLevelTarget","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"uint256","name":"_startTime","type":"uint256"},{"internalType":"uint256","name":"_endTime","type":"uint256"},{"internalType":"uint256","name":"_easyLevelTarget","type":"uint256"},{"internalType":"uint256","name":"_mediumLevelTarget","type":"uint256"},{"internalType":"uint256","name":"_hardLevelTarget","type":"uint256"}],"name":"createChallenge","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const address2='0x22BDE07C8fD3e406D173471680a4453fEA145d2C'
const abi3=[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"userAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"challengeId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"credits","type":"uint256"}],"name":"CarbonCreditProposed","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"challengeExists","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"challengeLevels","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"challengeTargetReduction","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_challengeId","type":"uint256"},{"internalType":"uint256","name":"_level","type":"uint256"},{"internalType":"uint256","name":"_targetReduction","type":"uint256"}],"name":"createChallenge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_challengeId","type":"uint256"}],"name":"getChallengeDetails","outputs":[{"internalType":"uint256","name":"level","type":"uint256"},{"internalType":"uint256","name":"targetReduction","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_userAddress","type":"address"},{"internalType":"uint256","name":"_challengeId","type":"uint256"}],"name":"getUserCreditsForChallenge","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_challengeId","type":"uint256"},{"internalType":"uint256","name":"_credits","type":"uint256"}],"name":"proposeCarbonReductionProof","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userCredits","outputs":[{"internalType":"uint256","name":"challengeId","type":"uint256"},{"internalType":"uint256","name":"credits","type":"uint256"}],"stateMutability":"view","type":"function"}];
const address3='0x11F3E63ffDC930ceDBd91599F8FA2Eb11f81581a'

// Define contract instances
const userRegistrationContract = new web3.eth.Contract(abi1, address1);
const challengeManagementContract = new web3.eth.Contract(abi2, address2);
const carbonCreditManagementContract = new web3.eth.Contract(abi3, address3);


// Function to register a user
async function registerUser(userAddress, name) {
  const accounts = await web3.eth.getAccounts();
  const gas = await userRegistrationContract.methods.registerUser(name).estimateGas({ from: accounts[0] });

  const result = await userRegistrationContract.methods.registerUser(name).send({
    from: accounts[0],
    gas,
  });

  return result;
}


// Function to fetch challenge details
async function getChallenges() {
  try {
      const challenges = await challengeManagementContract.methods.getAllChallenges().call();
      return challenges;
  } catch (error) {
      console.error(error);
      return [];
  }
}

// Function to register for a challenge
async function registerForChallenge(userAddress, challengeId) {
  try {
      const accounts = await web3.eth.getAccounts();
      await challengeManagementContract.methods.registerForChallenge(challengeId).send({ from: userAddress });
      return true;
  } catch (error) {
      console.error(error);
      return false;
  }
}

module.exports = {
  registerUser,
  getChallenges,
  registerForChallenge,
};
