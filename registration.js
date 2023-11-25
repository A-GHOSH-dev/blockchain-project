// registration.js
// The script for handling user registration on the client side.

document.addEventListener('DOMContentLoaded', () => {
    // Executes the enclosed code when the DOM content has been fully loaded.

    const registrationForm = document.getElementById('registration-form');
    const messageDiv = document.getElementById('message');
    // Retrieves references to the registration form and the message div in the HTML document.

    registrationForm.addEventListener('submit', async (e) => {
        // Listens for the form submission event and executes the enclosed code when the form is submitted.
        e.preventDefault(); // Prevents the default form submission behavior.

        const userAddress = document.getElementById('userAddress').value;
        const name = document.getElementById('name').value;
        // Retrieves the user's Ethereum address and name from the form inputs.

        // Send the user registration request to the backend
        const response = await fetch('/register', {
            // Initiates an asynchronous request to the '/register' endpoint on the backend.
            method: 'POST',
            // Specifies the HTTP method as POST.
            headers: { 'Content-Type': 'application/json' },
            // Sets the request header to indicate that the content is in JSON format.
            body: JSON.stringify({ userAddress, name }),
            // Converts the userAddress and name to JSON format and includes it in the request body.
        });

        const data = await response.json();
        // Parses the JSON response from the backend.

        if (data.success) {
            messageDiv.innerHTML = `User registered with transaction hash: ${data.txHash}`;
            // Displays a success message with the transaction hash if registration is successful.
        } else {
            messageDiv.innerHTML = `Registration failed: ${data.error}`;
            // Displays an error message if registration fails, including the error message from the backend.
        }
    });

    // Handle "View Challenges" button click
    const navigateToChallengesButton = document.getElementById('navigate-to-challenges');
    navigateToChallengesButton.style.display = 'none'; // Initially hide the button
    // Retrieves a reference to the "View Challenges" button and initially hides it.

    navigateToChallengesButton.addEventListener('click', () => {
        // Listens for a click event on the "View Challenges" button.
        window.location.href = '/challenges'; // Redirect to the challenges page
        // Redirects the user to the '/challenges' page when the button is clicked.
    });
});
