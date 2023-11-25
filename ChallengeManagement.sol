// SPDX-License-Identifier: MIT
// Specify the license for the smart contract

pragma solidity ^0.8.0;
// Declare the version of Solidity the smart contract is written in

contract ChallengeManagement {
    // Define a struct representing a Challenge with various attributes
    struct Challenge {
        uint256 challengeId;
        string name;
        uint256 startTime;
        uint256 endTime;
        uint256 easyLevelTarget;
        uint256 mediumLevelTarget;
        uint256 hardLevelTarget;
    }

    // Declare a mapping to store Challenge structs with their unique challengeId as the key
    mapping(uint256 => Challenge) public challenges;

    // Function to create a new challenge with specified parameters
    function createChallenge(
        string memory _name,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _easyLevelTarget,
        uint256 _mediumLevelTarget,
        uint256 _hardLevelTarget
    ) public {
        // Generate a unique challengeId using the hash of relevant parameters and the sender's address
        uint256 challengeId = uint256(keccak256(abi.encodePacked(msg.sender, _name, _startTime)));

        // Create a Challenge struct with the provided parameters
        challenges[challengeId] = Challenge({
            challengeId: challengeId,
            name: _name,
            startTime: _startTime,
            endTime: _endTime,
            easyLevelTarget: _easyLevelTarget,
            mediumLevelTarget: _mediumLevelTarget,
            hardLevelTarget: _hardLevelTarget
        });

        // Emit an event to log the creation of a new challenge
        emit ChallengeCreated(challengeId, _name, _startTime, _endTime);
    }

    // Event emitted when a new challenge is created
    event ChallengeCreated(
        uint256 indexed challengeId,
        string name,
        uint256 startTime,
        uint256 endTime
    );
}
