pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/Clones.sol";

contract StoreFactory {
    address public owner;
    address public impl;
    event cloneCreated(address indexed cloned, string msg);

    modifier OnlyOwner() {
        require(msg.sender == owner, "Only the owner can clone a store");
        _;
    }

    constructor(address _master) {
        owner = msg.sender;
        impl = _master;
    }

    function cloneStore(bytes32 _salt) public OnlyOwner {
        address ad = Clones.cloneDeterministic(impl, _salt);
        address adEv = Clones.predictDeterministicAddress(impl, _salt);
        emit cloneCreated(adEv, "sex");
    }

    function getCloneAddress(bytes32 _salt) public view returns (address) {
        address ad = Clones.predictDeterministicAddress(impl, _salt);
        return ad;
    }
}
