// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.0;

import {Vapor} from "./Vapor.sol";

contract DemoGame {

    bool private initialized = false;
    uint256 vaporGameID;

    function receiveInitialSettings(uint256 sessionID, bytes calldata initialSettings) external {
        // noop
    }

    function startGame(uint256 sessionID, address[] calldata players, bytes calldata startSettings, bytes[] calldata playerSettings) external {
        // noop
    }

    function init(Vapor vapor) external {
        require(!initialized);
        initialized = true;

        string[] memory empty = new string[](0);

        Vapor.SettingDeclaration[] memory initialSettingsManifest = new Vapor.SettingDeclaration[](3);
        initialSettingsManifest[0] = Vapor.SettingDeclaration({
            name: "Player Count",
            valueType: Vapor.ValueType.Uint,
            allowedValues: empty
        });
        initialSettingsManifest[1] = Vapor.SettingDeclaration({
            name: "WorldCoin Verified",
            valueType: Vapor.ValueType.Bool,
            allowedValues: empty
        });
        initialSettingsManifest[2] = Vapor.SettingDeclaration({
            name: "NextID Verified",
            valueType: Vapor.ValueType.Bool,
            allowedValues: empty
        });

        Vapor.SettingDeclaration[] memory startSettingsManifest = new Vapor.SettingDeclaration[](2);
        string[] memory spawnLocations = new string[](3);
        spawnLocations[0] = "Spawn 1";
        spawnLocations[1] = "Spawn 2";
        spawnLocations[1] = "Spawn 3";
        startSettingsManifest[0] = Vapor.SettingDeclaration({
            name: "Spawn Location",
            valueType: Vapor.ValueType.Enum,
            allowedValues: spawnLocations
        });
        startSettingsManifest[1] = Vapor.SettingDeclaration({
            name: "Use Whiteboard",
            valueType: Vapor.ValueType.Bool,
            allowedValues: empty
        });

        Vapor.SettingDeclaration[] memory playerSettingsManifest = new Vapor.SettingDeclaration[](2);
        playerSettingsManifest[0] = Vapor.SettingDeclaration({
            name: "Player Name",
            valueType: Vapor.ValueType.String,
            allowedValues: empty
        });
        string[] memory avatars = new string[](3);
        avatars[0] = "Avatar 1";
        avatars[1] = "Avatar 2";
        avatars[2] = "Avatar 3";
        playerSettingsManifest[1] = Vapor.SettingDeclaration({
            name: "Avatar",
            valueType: Vapor.ValueType.String,
            allowedValues: avatars
        });

        vaporGameID = vapor.registerGame(Vapor.GameConfig({
            gameID: 0,
            name: "Demo Game",
            authority: msg.sender,
            initialSettingsManifest: initialSettingsManifest,
            startSettingsManifest: startSettingsManifest,
            playerSettingsManifest: playerSettingsManifest,
            sendInitialSettings: this.receiveInitialSettings,
            startCallback: this.startGame
        }));
    }
}
