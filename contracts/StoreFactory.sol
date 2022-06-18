pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";
import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";
import "@openzeppelin/contracts/proxy/beacon/IBeacon.sol";

contract StoreFactoryClones {
    address public owner;
    address public impl;
    event cloneCreated(address indexed cloned);

    modifier OnlyOwner() {
        require(msg.sender == owner, "Only the owner can clone a store");
        _;
    }

    constructor() {
        owner = msg.sender;
        impl = address(new StoreCl()); // master
    }

    function cloneStore(bytes32 _salt) public OnlyOwner {
        address ad = Clones.cloneDeterministic(impl, _salt);
        emit cloneCreated(ad);
    }
}

contract StoreCl {
    string public value;

    function setValue(string memory newValue) public {
        value = newValue;
    }
}

// contract StoreFactoryBeaconProxy {
//     address public owner;
//     address public impl;

//     mapping(uint256 => address) public storeAddress;
//     uint256 public id;

//     UpgradeableBeacon immutable ub;

//     modifier OnlyOwner() {
//         require(msg.sender == owner, "Only the owner can clone a store");
//         _;
//     }

//     constructor() {
//         owner = msg.sender;
//         impl = address(new StoreBe()); // master
//         ub = new UpgradeableBeacon(impl);
//     }

//     function cloneStore(bytes memory _salt) public OnlyOwner {
//         address proxyAddress = address(new BeaconProxy(address(ub), _salt));
//         storeAddress[id] = proxyAddress;
//         id++;
//     }
// }

// contract StoreBe {
//     string public value;

//     function setValue(string memory newValue) public {
//         value = newValue;
//     }
// }

contract StoreFactory {
    address public impl;
    uint256 public id;

    UpgradeableBeacon public ub;
    mapping(uint256 => address) public storeAddress;

    constructor(address _impl) {
        impl = _impl;
        ub = new UpgradeableBeacon(_impl);
    }

    function clone() public {
        address proxyAddress = address(new BeaconProxy(address(ub), ""));
        storeAddress[id] = proxyAddress;
        id++;
    }
}

contract StoreMaster {
    string public value;

    function initialize(string memory _val) public {
        value = _val;
    }
}
