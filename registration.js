// registration.js
document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registration-form');
    const messageDiv = document.getElementById('message');
  
    registrationForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const userAddress = document.getElementById('userAddress').value;
      const name = document.getElementById('name').value;
  
      // Send the user registration request to the backend
      const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userAddress, name }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        messageDiv.innerHTML = `User registered with transaction hash: ${data.txHash}`;
      } else {
        messageDiv.innerHTML = `Registration failed: ${data.error}`;
      }
    });


 // Handle "View Challenges" button click
 const navigateToChallengesButton = document.getElementById('navigate-to-challenges');
 navigateToChallengesButton.style.display = 'none'; // Initially hide the button

 navigateToChallengesButton.addEventListener('click', () => {
     window.location.href = '/challenges'; // Redirect to the challenges page
 });


  });
  