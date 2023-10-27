document.addEventListener('DOMContentLoaded', async () => {
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); // Use your Ethereum node URL
    const userAddress = 'YOUR_USER_ADDRESS'; // Replace with the user's Ethereum address
    
    // Define contract instances
    const challengeManagementContract = new web3.eth.Contract(challengeManagementAbi, 'YOUR_CHALLENGE_MANAGEMENT_CONTRACT_ADDRESS'); // Use your contract address

    // Function to fetch and display challenges
    async function displayChallenges() {
        const challengesList = document.getElementById('challenges-list');
        challengesList.innerHTML = ''; // Clear the previous list

        const challenges = await getChallenges(); // Implement getChallenges function

        if (challenges.length === 0) {
            challengesList.innerHTML = 'No challenges available.';
        } else {
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

                const registerButton = document.createElement('button');
                registerButton.textContent = 'Register';
                registerButton.addEventListener('click', async () => {
                    const registered = await registerForChallenge(userAddress, challenge.challengeId);
                    if (registered) {
                        document.getElementById('message').innerHTML = 'Registered for the challenge!';
                    } else {
                        document.getElementById('message').innerHTML = 'Failed to register for the challenge.';
                    }
                });

                challengeDiv.appendChild(registerButton);
                challengesList.appendChild(challengeDiv);
            });
        }
    }

    // Display challenges
    await displayChallenges();

    // Handle "Register for Challenge" button click
    const registerChallengeButton = document.getElementById('register-challenge');
    registerChallengeButton.addEventListener('click', async () => {
        await displayChallenges();
    });
});
