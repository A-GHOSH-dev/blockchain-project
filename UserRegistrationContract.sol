// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserRegistrationContract {
    struct User {
        address userAddress;
        string name;
        // Add other user details here
    }
    
    mapping(address => User) public users;
    
    function registerUser(string memory _name) public {
        // Ensure the user is not already registered
        require(users[msg.sender].userAddress == address(0), "User already registered.");
        
        User storage user = users[msg.sender];
        user.userAddress = msg.sender;
        user.name = _name;
        // Initialize other user details
        
        // Emit an event for user registration
        emit UserRegistered(msg.sender, _name);
    }

    event UserRegistered(address indexed userAddress, string name);
}
