// SPDX-License-Identifier
pragma solidity 0.8.16;

contract KNOV1 {
    struct User {
        address userwallet;
        string nickname;
        bool isRegistered;
    }

    mapping(address => User) private users;

    function isRegistered() external view returns (bool) {
        return users[msg.sender].isRegistered;
    }
}
