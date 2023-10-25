// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CarbonCreditManagement {
    struct CarbonCredit {
        uint256 challengeId;
        uint256 credits;
    }

    mapping(address => CarbonCredit) public userCredits;
    mapping(uint256 => bool) public challengeExists;
    mapping(uint256 => uint256) public challengeLevels;
    mapping(uint256 => uint256) public challengeTargetReduction;

    event CarbonCreditProposed(address indexed userAddress, uint256 challengeId, uint256 credits);

    // Function to propose carbon reduction proof and earn credits
    function proposeCarbonReductionProof(uint256 _challengeId, uint256 _credits) public {
        require(!challengeExists[_challengeId], "Challenge does not exist");
        require(userCredits[msg.sender].challengeId != _challengeId, "Already proposed credits for this challenge");

        uint256 earnedCredits = calculateEarnedCredits(_challengeId, _credits);
        
        // Award credits to the user
        userCredits[msg.sender] = CarbonCredit({
            challengeId: _challengeId,
            credits: earnedCredits
        });

        emit CarbonCreditProposed(msg.sender, _challengeId, earnedCredits);
    }

    // Function to check the user's earned credits for a specific challenge
    function getUserCreditsForChallenge(address _userAddress, uint256 _challengeId) public view returns (uint256) {
        CarbonCredit memory userCredit = userCredits[_userAddress];
        if (userCredit.challengeId == _challengeId) {
            return userCredit.credits;
        } else {
            return 0; // User has not earned credits for this challenge
        }
    }

    // Function to create a new challenge
    function createChallenge(uint256 _challengeId, uint256 _level, uint256 _targetReduction) public {
        require(!challengeExists[_challengeId], "Challenge already exists");
        challengeExists[_challengeId] = true;
        challengeLevels[_challengeId] = _level;
        challengeTargetReduction[_challengeId] = _targetReduction;
    }

    // Function to get challenge details
    function getChallengeDetails(uint256 _challengeId) public view returns (uint256 level, uint256 targetReduction) {
        require(challengeExists[_challengeId], "Challenge does not exist");
        return (challengeLevels[_challengeId], challengeTargetReduction[_challengeId]);
    }

    // Calculate earned credits based on challenge and reduction
    function calculateEarnedCredits(uint256 _challengeId, uint256 _credits) internal view returns (uint256) {
        require(challengeExists[_challengeId], "Challenge does not exist");
        uint256 level = challengeLevels[_challengeId];
        uint256 targetReduction = challengeTargetReduction[_challengeId];

        require(_credits >= 0 && _credits <= 100, "Invalid credits");

        // Calculate earned credits based on the challenge level and reduction achieved
        uint256 earnedCredits = (_credits * level) / targetReduction;
        return earnedCredits;
    }
}
