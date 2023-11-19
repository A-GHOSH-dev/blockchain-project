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


    function registerUser(string memory _name, string memory _password) public {
        require(!isUserRegistered[msg.sender], "User already registered.");

        User storage user = users[msg.sender];
        user.name = _name;
        user.password = _password;

        isUserRegistered[msg.sender] = true;

        emit UserRegistered(msg.sender, _name);
    }


    function loginUser(string memory _password) public onlyRegisteredUser {
        require(keccak256(abi.encodePacked(_password)) == keccak256(abi.encodePacked(users[msg.sender].password)), "Incorrect password.");

        emit UserLoggedIn(msg.sender);
    }
}
