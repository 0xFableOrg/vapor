// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.0;

contract Vapor {
    // =============================================================================================
    // ERRORS

    // Someone attempted to start a game that did not create it.
    error WrongCreator();

    // Someone attempted to complete a game that was not the authority.
    error WrongAuthority();

    // =============================================================================================
    // EVENTS

    // Emitted when a new game is registered.
    event GameRegistered(uint256 gameID);

    // Emitted when a new game is created.
    event GameCreated(uint256 indexed gameID, uint256 sessionID);

    // Emitted when a game is started.
    event GameStarted(uint256 indexed gameID, uint256 indexed sessionID);

    // =============================================================================================
    // STRUCTS

    enum ValueType {
        Bool,
        Int, // encoded as int256
        Uint, // encoded as uint256
        Address,
        Bytes,
        String,
        Enum // encoded as string
    }

    struct SettingDeclaration {
        string name;
        ValueType valueType;
        // If valueType is Enum, this is the list of allowed values, otherwise empty.
        string[] allowedValues;
    }

    struct GameConfig {
        uint256 gameID;
        string name;
        /**
         * This address is allowed to finish the game.
         */
        address authority;
        /**
         * Specifies the settings to be provided at game creation time.
         */
        SettingDeclaration[] initialSettingsManifest;
        /**
         * Specifies the settings to be provided at game start time.
         */
        SettingDeclaration[] startSettingsManifest;
        /**
         * Specifies the settings to be provided for each player at game start time.
         */
        SettingDeclaration[] playerSettingsManifest;
        /**
         * This gets called with the sessionID and the encoded settings to validate the initial
         * settings. The contract must validate the settings and revert if they are invalid. This
         * includes verifying enum conformity. The contract must store these settings to be used
         * when the game starts.
         *
         * The settings will be encoded in the same way as abi.encode for a struct containing the
         * fields listed in the manifest.
         */
        function (uint256, bytes memory) external sendInitialSettings;
        /**
         * This gets called with with the sessionID, player list, encoded start settings, and
         * encoded per-player start settings. This includes verifying enum conformity. The contract
         * must validate the settings and revert if they are invalid.
         *
         * The settings will be encoded in the same way as abi.encode for a struct containing the
         * fields listed in the manifest. Enum conformity will be pre-validated.
         */
        function (uint256, address[] memory, bytes memory, bytes[] memory) external startCallback;
    }

    struct GameConfigLight {
        uint256 gameID;
        string name;
        address authority;
        SettingDeclaration[] initialSettingsManifest;
        SettingDeclaration[] startSettingsManifest;
        SettingDeclaration[] playerSettingsManifest;
    }

    enum GameStatus {
        Created,
        Started,
        Completed
    }

    struct Session {
        uint256 gameID;
        uint256 sessionID;
        // index of the session within the joinableSessions array, or 0 if not joinable
        uint256 joinableIndex;
        string name;
        address creator;
        GameStatus status;
        bytes initialSettings;
    }

    // =============================================================================================
    // FIELDS

    mapping(uint256 => GameConfig) private gameConfigs;
    uint256 public nextGameID;

    mapping(uint256 => Session) public sessions;
    uint256 public nextSessionID;

    // List of sessions that are joinable.
    uint256[] private joinableSessions;

    // =============================================================================================
    // CONSTRUCTOR

    constructor() {
        joinableSessions.push(0); // the first index is invalid
    }

    // =============================================================================================
    // FUNCTIONS

    function registerGame(GameConfig calldata config_) external returns (uint256 gameID) {
        gameID = nextGameID++;
        GameConfig storage config = gameConfigs[gameID];
        config.gameID = gameID;
        config.name = config_.name;
        config.authority = config_.authority;
        copySettingDeclarations(config.initialSettingsManifest, config_.initialSettingsManifest);
        copySettingDeclarations(config.startSettingsManifest, config_.startSettingsManifest);
        copySettingDeclarations(config.playerSettingsManifest, config_.playerSettingsManifest);
        emit GameRegistered(gameID);
    }

    // ---------------------------------------------------------------------------------------------

    function copySettingDeclarations(
        SettingDeclaration[] storage declarations,
        SettingDeclaration[] calldata declarations_
    ) internal {
        for (uint256 i = 0; i < declarations_.length; i++) {
            declarations.push();
            SettingDeclaration storage declaration = declarations[i];
            SettingDeclaration calldata declaration_ = declarations_[i];
            declaration.name = declaration_.name;
            declaration.valueType = declaration_.valueType;
            // copy allowed values
            for (uint256 j = 0; j < declaration_.allowedValues.length; j++) {
                declaration.allowedValues.push(declaration_.allowedValues[j]);
            }
        }
    }

    // ---------------------------------------------------------------------------------------------

    function createSession(uint256 gameID, string calldata name, bytes calldata initialSettings)
    external
    returns (uint256 sessionID)
    {
        sessionID = nextSessionID++;
        GameConfig storage config = gameConfigs[gameID];
        config.sendInitialSettings(sessionID, initialSettings);
        sessions[sessionID] =
                        Session(gameID, sessionID, joinableSessions.length, name, msg.sender, GameStatus.Created, initialSettings);
        joinableSessions.push(sessionID);
        emit GameCreated(gameID, sessionID);
    }

    // ---------------------------------------------------------------------------------------------

    function startSession(
        uint256 sessionID,
        address[] calldata players,
        bytes calldata startSettings,
        bytes[] calldata playerSettings
    ) external {
        Session storage session = sessions[sessionID];
        if (session.creator != msg.sender) {
            revert WrongCreator();
        }

        // remove from joinable sessions
        joinableSessions[session.joinableIndex] = joinableSessions[joinableSessions.length - 1];
        sessions[joinableSessions[session.joinableIndex]].joinableIndex = session.joinableIndex;
        joinableSessions.pop();
        session.status = GameStatus.Started;
        session.joinableIndex = 0;

        uint256 gameID = session.gameID;
        GameConfig storage config = gameConfigs[gameID];
        config.startCallback(sessionID, players, startSettings, playerSettings);
        emit GameStarted(gameID, sessionID);
    }

    // ---------------------------------------------------------------------------------------------

    function completeSession(uint256 sessionID) external {
        Session storage session = sessions[sessionID];
        GameConfig storage config = gameConfigs[session.gameID];
        if (config.authority != msg.sender) {
            revert WrongAuthority();
        }
        session.status = GameStatus.Completed;
        // NOTE: In the future, we can provide extra features here, e.g. recording the result of
        // the game, awarding rewards, or resolving bets.
    }

    // ---------------------------------------------------------------------------------------------

    /**
     * Helper function to help validate that enum values are one of the allowed values.
     */
    function validateEnumValue(string[] calldata allowedValues, string calldata value) external pure returns (bool) {
        for (uint256 i = 0; i < allowedValues.length; i++) {
            if (keccak256(bytes(allowedValues[i])) == keccak256(bytes(value))) {
                return true;
            }
        }
        return false;
    }

    // ---------------------------------------------------------------------------------------------

    /**
     * Returns the list of joinable sessions. Note that because of the way games are removed
     * from the list, the order of the list is not stable. The frontend should sort the list
     * according to some criteria (sessionID, name, ...).
     */
    function getJoinableSessions() external view returns (Session[] memory) {
        Session[] memory result = new Session[](joinableSessions.length - 1);
        for (uint256 i = 1; i < joinableSessions.length; i++) {
            result[i - 1] = sessions[joinableSessions[i]];
        }
        return result;
    }

    // =============================================================================================
    // Ugly hacks because Ethers.js sucks

    function getInitialSettingsManifest(uint256 gameID) external view returns (SettingDeclaration[] memory) {
        return gameConfigs[gameID].initialSettingsManifest;
    }

    function getStartSettingsManifest(uint256 gameID) external view returns (SettingDeclaration[] memory) {
        return gameConfigs[gameID].startSettingsManifest;
    }

    function getPlayerSettingsManifest(uint256 gameID) external view returns (SettingDeclaration[] memory) {
        return gameConfigs[gameID].playerSettingsManifest;
    }

    // =============================================================================================

    function getGameConfig(uint256 gameID) external view returns (GameConfigLight memory) {
        GameConfig storage config = gameConfigs[gameID];
        GameConfigLight memory out;
        out.gameID = config.gameID;
        out.name = config.name;
        out.authority = config.authority;
        out.initialSettingsManifest = config.initialSettingsManifest;
        out.startSettingsManifest = config.startSettingsManifest;
        out.playerSettingsManifest = config.playerSettingsManifest;
        return out;
    }

    // =============================================================================================
}
