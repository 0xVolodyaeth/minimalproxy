pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/Clones.sol";

contract StoreFactory {
    address public owner;
    address public impl;

    event cloneCreated(address cloned);

    using Clones for address;

    modifier OnlyOwner() {
        require(msg.sender == owner, "Only the owner can clone a store");
        _;
    }

    constructor(address _impl) {
        owner = msg.sender;
        impl = _impl;
    }

    function cloneStore() public OnlyOwner {
        address ad = impl.clone();
        emit cloneCreated(ad);
    }
}
