// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

contract KNOV1 {
    address immutable admin;
    uint256 private totalQuestion;

    mapping(address => User) users;
    mapping(address => Question[]) questionList;
    mapping(address => Answer[]) answerList;
    mapping(uint256 => Answer[]) posts;

    struct User {
        address userWalletAddress;
        string nickname;
        bool isRegistered;
    }

    struct Question {
        address author;
        uint256 qid;
        string cid;
    }

    struct Answer {
        address author;
        uint256 qid;
        uint256 aid;
        string cid;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerUser(string calldata nickname) external returns (bool) {
        require(!users[msg.sender].isRegistered, "User already registered");
        users[msg.sender] = User(msg.sender, nickname, true);
        return true;
    }

    function isRegistered(address userAddr) external view returns (bool) {
        return users[userAddr].isRegistered;
    }

    function signIn() external view returns (string memory) {
        User memory user = users[msg.sender];
        require(user.isRegistered, "User not registered");
        return user.nickname;
    }

    function postQuestion(uint256 timestamp, string calldata cid)
        external
        returns (bool)
    {}

    function postAnswer(uint256 qid) external returns (bool) {}
}
