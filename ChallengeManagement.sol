// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ChallengeManagement {
    struct Challenge {
        uint256 challengeId;
        string name;
        uint256 startTime;
        uint256 endTime;
        uint256 easyLevelTarget;
        uint256 mediumLevelTarget;
        uint256 hardLevelTarget;
    }
    
    mapping(uint256 => Challenge) public challenges;
    
    function createChallenge(
        string memory _name,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _easyLevelTarget,
        uint256 _mediumLevelTarget,
        uint256 _hardLevelTarget
    ) public {
        // Create a new challenge
        uint256 challengeId = uint256(keccak256(abi.encodePacked(msg.sender, _name, _startTime)));
        challenges[challengeId] = Challenge({
            challengeId: challengeId,
            name: _name,
            startTime: _startTime,
            endTime: _endTime,
            easyLevelTarget: _easyLevelTarget,
            mediumLevelTarget: _mediumLevelTarget,
            hardLevelTarget: _hardLevelTarget
        });

        // Emit an event for challenge creation
        emit ChallengeCreated(challengeId, _name, _startTime, _endTime);
    }

    event ChallengeCreated(
        uint256 indexed challengeId,
        string name,
        uint256 startTime,
        uint256 endTime
    );
}
