pragma solidity ^0.8.0;

contract Store {
    string public value;

    function setValue(string calldata newValue) external {
        value = newValue;
    }
}
