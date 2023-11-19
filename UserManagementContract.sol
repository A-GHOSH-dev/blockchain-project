// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserManagementContract {
    struct User {
        string name;
        string password; // For simplicity, you might want to use more secure authentication methods in a real-world scenario
        // Add other user details here
    }

    mapping(address => User) public users;
    mapping(address => bool) public isUserRegistered;

    event UserRegistered(address indexed userAddress, string name);
    event UserLoggedIn(address indexed userAddress);

    modifier onlyRegisteredUser() {
        require(isUserRegistered[msg.sender], "User not registered.");
        _;
    }
