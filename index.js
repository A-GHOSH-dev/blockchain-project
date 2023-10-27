// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { registerUser } = require('./blockchain');
const path = require('path'); // Include the path module to handle file paths

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));


// Serve the HTML page on a GET request
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/register', async (req, res) => {
  const { userAddress, name } = req.body;

  try {
    const result = await registerUser(userAddress, name);
    res.json({ success: true, txHash: result.transactionHash });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
