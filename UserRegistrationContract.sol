// SPDX-License-Identifier: MIT
// The SPDX-License-Identifier specifies the license under which the contract is distributed.
// In this case, it's MIT License, a permissive open-source license.
pragma solidity ^0.8.0;
// Specifies the version of the Solidity compiler required to compile the contract.

contract UserRegistrationContract {
// Declaration of a Solidity contract named UserRegistrationContract.

    struct User {
        address userAddress;
        string name;
        // Add other user details here
    }
    // Definition of a User struct to store user information.
    // It includes the user's Ethereum address and name.
    // There is a comment indicating that additional details can be added.
    mapping(address => User) public users;
    // Declaration of a state variable 'users' as a mapping that associates
    // Ethereum addresses with User structs.
    // This allows efficient storage and retrieval of user information.

    function registerUser(string memory _name) public {
        // Declaration of a function named registerUser that takes a string parameter '_name'.
        // The function is set as public, meaning it can be called externally.

        // Ensure the user is not already registered
        require(users[msg.sender].userAddress == address(0), "User already registered.");
        // Checks if the user is not already registered by verifying if the user's address is not set.
        // If the user is already registered, it raises an error with the specified message.

        User storage user = users[msg.sender];
        // Creates a storage reference 'user' pointing to the User struct associated with the sender's address.

        user.userAddress = msg.sender;
        user.name = _name;
        // Initialize other user details
        // Sets the user's name in the User struct to the provided '_name' parameter.
        // Additional user details can be initialized in a similar manner.

        // Emit an event for user registration
        emit UserRegistered(msg.sender, _name);
        // Emits a UserRegistered event, providing the user's Ethereum address and name as indexed parameters.
        // This event can be used to track user registrations and listen for them externally.

    }

    event UserRegistered(address indexed userAddress, string name);
    // Declaration of the UserRegistered event.
    // It is emitted when a user is successfully registered, providing the user's Ethereum address and name as parameters.

}
