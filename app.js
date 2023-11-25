// // app.js

// const express = require('express');
// const { Web3 } = require('web3');
// const fs = require('fs');

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');

// var web3 = new Web3('http://127.0.0.1:7545'); // Replace with your Ethereum provider URL
// const contractAbi = {
//     UserRegistrationContract: JSON.parse(fs.readFileSync('contracts/UserRegistrationContract.json')),
//     ChallengeManagement: JSON.parse(fs.readFileSync('contracts/ChallengeManagement.json')),
//     CarbonCreditManagement: JSON.parse(fs.readFileSync('contracts/CarbonCreditManagement.json')),
// };

// const userRegistrationContract = new web3.eth.Contract(
//     contractAbi.UserRegistrationContract.abi,
//     '0x1c17232fE9E853f7C8876Ed55A64a67061894f3A'
// ); // Replace with the contract address

// app.get('/', (req, res) => {
//     res.render('index');
// });

// app.post('/register', (req, res) => {
//     const { name } = req.body;

//     // Interaction with the UserRegistrationContract
//     userRegistrationContract.methods.registerUser(name).send({ from: '0x1ddE01DB4EE3E009f325b49510371aADE55f0823' }) // Replace with sender's Ethereum address
//         .on('transactionHash', (hash) => {
//             console.log('Transaction Hash:', hash);
//             res.send('User registered successfully.');
//         })
//         .on('error', (error) => {
//             console.error('Registration Error:', error);
//             res.status(500).send('User registration failed.');
//         });
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


// //0x22BDE07C8fD3e406D173471680a4453fEA145d2C
// //0x1ddE01DB4EE3E009f325b49510371aADE55f0823

// //0x11F3E63ffDC930ceDBd91599F8FA2Eb11f81581a
// //0x1ddE01DB4EE3E009f325b49510371aADE55f0823


const express = require('express');
const { Web3 } = require('web3');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');

var web3 = new Web3('http://127.0.0.1:7545'); // Replace with your Ethereum provider URL
const contractAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"userAddress","type":"address"},{"indexed":false,"internalType":"string","name":"name","type":"string"}],"name":"UserRegistered","type":"event"},{"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"registerUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"}];

const userRegistrationContract = new web3.eth.Contract(
  contractAbi,
  '0x1c17232fE9E853f7C8876Ed55A64a67061894f3A'
); // Replace with the contract address

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/register', (req, res) => {
  const { name } = req.body;

  // Interaction with the UserRegistrationContract
  userRegistrationContract.methods.registerUser(name).send({ from: '0x1ddE01DB4EE3E009f325b49510371aADE55f0823' }) // Replace with sender's Ethereum address
    .on('transactionHash', (hash) => {
      console.log('Transaction Hash:', hash);
      res.send('User registered successfully.');
    })
    .on('error', (error) => {
      console.error('Registration Error:', error);
      res.status(500).send('User registration failed.');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
