// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

contract KNOV1 {
    address immutable admin;

    uint256 private totalQuestionNumber;
    uint256 private totalAnswerNumber;

    mapping(address => User) users; // user registry info

    mapping(address => uint256[]) userQuestionList; // address -> qids
    mapping(address => uint256[]) userAnswerList; // address -> aids

    mapping(uint256 => Question) questionList; // qid -> Question
    mapping(uint256 => Answer) answerList; // aid -> Answer

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

    /* 
        Read functions
    */
    function isRegistered(address userAddr) external view returns (bool) {
        return users[userAddr].isRegistered;
    }

    function getUserNickname() external view returns (string memory) {
        User memory user = users[msg.sender];
        require(user.isRegistered, "User not registered");
        return user.nickname;
    }

    function getTotalQuestionNumber() external view returns(uint256) {
        return totalQuestionNumber;
    }

    function getTotalAnswerNumber() external view returns(uint256) {
        return totalAnswerNumber;
    }

    function getUserQids() external view returns (uint256[] memory) {
        return userQuestionList[msg.sender];
    }

    function getUserAids() external view returns (uint256[] memory) {
        return userAnswerList[msg.sender];
    }

    function getQuestion(uint256 qid) external view returns(Question memory) {
        return questionList[qid];
    }

    function getQuestionCid(uint256 qid) external view returns(string memory) {
        return questionList[qid].cid;
    }

    function getAnswer(uint256 aid) external view returns(Answer memory) {
        return answerList[aid];
    }

    /* 
        Write functions
    */

    function postQuestion(string calldata cid)
        external
        returns (bool)
    {   
        questionList[totalQuestionNumber] = Question(msg.sender, totalQuestionNumber, cid);
        userQuestionList[msg.sender].push(totalQuestionNumber);
        totalQuestionNumber++; // increase qid

        //! TODO: should reward the user with KNO Token

        //! TODO: should implement reward lockup
        return true;
    }

    function postAnswer(uint256 qid) external returns (bool) {}
}
