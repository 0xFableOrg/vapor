// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.0;

import {Script, console2} from "forge-std/Script.sol";
// import {Multicall3} from "multicall/Multicall3.sol";

contract Deploy is Script {
    bytes32 private constant salt = bytes32(uint256(4269));

    MyContract public myContract;

    bool private doLog = true;

    function dontLog() external {
        doLog = false;
    }

    function log(string memory s, address a) private view {
        if (doLog) {
            console2.log(s, a); // solhint-disable-line
        }
    }

    function run() external {
        vm.startBroadcast();

        // deploy
        myContract = new MyContract();

        // initialize
        myContract.initialize();

        log("MyContract address", address(myContract));

        vm.stopBroadcast();

        // Anvil first two test accounts.
        string memory mnemonic = "test test test test test test test test test test test junk";
        (address account0,) = deriveRememberKey(mnemonic, 0);
        (address account1,) = deriveRememberKey(mnemonic, 1);

        vm.broadcast(account0);
        // do some stuff
        vm.broadcast(account1);
        // do some stuff

        // In case we need it.
        // Multicall3 multicall = new Multicall3();
        // console2.log("Multicall3 address", address(multicall));
    }
}
