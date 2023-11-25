// Add an event listener for the DOMContentLoaded event to ensure the DOM is fully loaded before executing the code
document.addEventListener('DOMContentLoaded', async () => {
    // Create a new instance of the Web3 library and connect to the local Ethereum node
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); // Use your Ethereum node URL
    const userAddress = 'YOUR_USER_ADDRESS'; // Replace with the user's Ethereum address

    // Define an instance of the Challenge Management smart contract using its ABI and address
    const challengeManagementContract = new web3.eth.Contract(challengeManagementAbi, 'YOUR_CHALLENGE_MANAGEMENT_CONTRACT_ADDRESS'); // Use your contract address

    // Define an asynchronous function to fetch and display challenges
    async function displayChallenges() {
        // Get the HTML element that will contain the list of challenges
        const challengesList = document.getElementById('challenges-list');
        challengesList.innerHTML = ''; // Clear the previous list

        // Call the getChallenges function to retrieve the list of challenges
        const challenges = await getChallenges(); // Implement getChallenges function

        // Check if there are no challenges available
        if (challenges.length === 0) {
            challengesList.innerHTML = 'No challenges available.';
        } else {
            // Iterate through the list of challenges and create HTML elements to display challenge details
            challenges.forEach(challenge => {
                const challengeDiv = document.createElement('div');
                challengeDiv.innerHTML = `
                    <p><strong>Name:</strong> ${challenge.name}</p>
                    <p><strong>Start Time:</strong> ${new Date(challenge.startTime * 1000).toLocaleString()}</p>
                    <p><strong>End Time:</strong> ${new Date(challenge.endTime * 1000).toLocaleString()}</p>
                    <p><strong>Easy Level Target:</strong> ${challenge.easyLevelTarget}%</p>
                    <p><strong>Medium Level Target:</strong> ${challenge.mediumLevelTarget}%</p>
                    <p><strong>Hard Level Target:</strong> ${challenge.hardLevelTarget}%</p>
                `;

                // Create a button to register for the challenge and add an event listener to handle the registration
                const registerButton = document.createElement('button');
                registerButton.textContent = 'Register';
                registerButton.addEventListener('click', async () => {
                    // Call the registerForChallenge function when the "Register" button is clicked
                    const registered = await registerForChallenge(userAddress, challenge.challengeId);
                    if (registered) {
                        // Display a success message if registration is successful
                        document.getElementById('message').innerHTML = 'Registered for the challenge!';
                    } else {
                        // Display an error message if registration fails
                        document.getElementById('message').innerHTML = 'Failed to register for the challenge.';
                    }
                });

                // Append the "Register" button to the challenge details
                challengeDiv.appendChild(registerButton);
                // Append the challenge details to the list of challenges
                challengesList.appendChild(challengeDiv);
            });
        }
    }

    // Display challenges when the page is loaded
    await displayChallenges();

    // Add an event listener for the "Register for Challenge" button click to refresh the list of challenges
    const registerChallengeButton = document.getElementById('register-challenge');
    registerChallengeButton.addEventListener('click', async () => {
        await displayChallenges();
    });
});
