// SPDX-License-Identifier: MIT
// The SPDX-License-Identifier specifies the license under which the contract is distributed.
// In this case, it's MIT License, a permissive open-source license.

pragma solidity ^0.8.0;
// Specifies the version of the Solidity compiler required to compile the contract.

contract UserManagementContract {
    // Declaration of a Solidity contract named UserManagementContract.

    struct User {
        string name;
        string password; // For simplicity, you might want to use more secure authentication methods in a real-world scenario
        // Add other user details here
    }
    // Definition of a User struct to store user information.
    // It includes the user's name, password, and there is a comment suggesting that additional details can be added.
    // A note about using more secure authentication methods in a real-world scenario is included.

    mapping(address => User) public users;
    // Declaration of a state variable 'users' as a mapping that associates
    // Ethereum addresses with User structs.
    // This allows efficient storage and retrieval of user information.

    mapping(address => bool) public isUserRegistered;
    // Declaration of a mapping 'isUserRegistered' to keep track of whether a user is registered or not.

    event UserRegistered(address indexed userAddress, string name);
    // Declaration of the UserRegistered event.
    // It is emitted when a user is successfully registered, providing the user's Ethereum address and name as parameters.

    event UserLoggedIn(address indexed userAddress);
    // Declaration of the UserLoggedIn event.
    // It is emitted when a user successfully logs in, providing the user's Ethereum address as a parameter.

    modifier onlyRegisteredUser() {
        // Declaration of a modifier named onlyRegisteredUser.
        // It ensures that the function using this modifier can only be executed by a registered user.

        require(isUserRegistered[msg.sender], "User not registered.");
        // Checks if the user is registered. If not, it raises an error with the specified message.
        _;
        // The underscore is a placeholder where the modified function's body will be placed.
        // It represents the point where the modified function's code will be inserted.
    }

    function registerUser(string memory _name, string memory _password) public {
        // Declaration of a function named registerUser that takes two string parameters '_name' and '_password'.
        // It allows users to register with a name and password.

        require(!isUserRegistered[msg.sender], "User already registered.");
        // Checks if the user is not already registered. If registered, it raises an error with the specified message.

        User storage user = users[msg.sender];
        // Creates a storage reference 'user' pointing to the User struct associated with the sender's address.

        user.name = _name;
        // Sets the user's name in the User struct to the provided '_name' parameter.

        user.password = _password;
        // Sets the user's password in the User struct to the provided '_password' parameter.

        isUserRegistered[msg.sender] = true;
        // Marks the user as registered in the 'isUserRegistered' mapping.

        emit UserRegistered(msg.sender, _name);
        // Emits a UserRegistered event, providing the user's Ethereum address and name as parameters.
    }

    function loginUser(string memory _password) public onlyRegisteredUser {
        // Declaration of a function named loginUser that takes a string parameter '_password'.
        // It allows registered users to log in.

        require(keccak256(abi.encodePacked(_password)) == keccak256(abi.encodePacked(users[msg.sender].password)), "Incorrect password.");
        // Checks if the provided password matches the stored password for the user.
        // If not, it raises an error with the specified message.

        emit UserLoggedIn(msg.sender);
        // Emits a UserLoggedIn event, providing the user's Ethereum address as a parameter.
    }
}
