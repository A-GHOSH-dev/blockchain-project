// app.js

// Require necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const { registerUser } = require('./blockchain');
const path = require('path'); // Include the path module to handle file paths

// Create an instance of the Express application
const app = express();

// Set the port for the server to listen on
const port = 3000;

// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (e.g., HTML, CSS) from the current directory
app.use(express.static(__dirname));

// Serve the HTML page on a GET request to the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Define endpoints

// Endpoint for user registration
app.post('/register', async (req, res) => {
  // Extract userAddress and name from the request body
  const { userAddress, name } = req.body;

  try {
    // Call the registerUser function from the blockchain module
    const result = await registerUser(userAddress, name);
    // Respond with a JSON indicating success and the transaction hash
    res.json({ success: true, txHash: result.transactionHash });
  } catch (error) {
    // Respond with a 500 status and an error message if registration fails
    res.status(500).json({ success: false, error: error.message });
  }
});

// Serve the challenges HTML page on a GET request to '/challenges'
app.get('/challenges', (req, res) => {
  res.sendFile(path.join(__dirname, 'challenges.html'));
});

// Endpoint for registering a user for a challenge
app.post('/challengeregister', async (req, res) => {
  // Extract userAddress, name, and challengeId from the request body
  const { userAddress, name, challengeId } = req.body;

  try {
    // Call the registerUser function from the blockchain module with challengeId
    const result = await registerUser(userAddress, name, challengeId);
    // Respond with a JSON indicating success and the transaction hash
    res.json({ success: true, txHash: result.transactionHash });
  } catch (error) {
    // Respond with a 500 status and an error message if registration for a challenge fails
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
