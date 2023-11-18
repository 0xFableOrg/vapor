# VAPOR Design Document

## UX

### Game Room List Page

Game rooms (aka "sessions" in the contracts) are listed on this page. This can be gotten from the
`getJoinableSessions` function in the contract. The list order is not stable and should be sorted
either by sessionID or by the name of the game room.

For each game room, we should display the game name, as well as its initial settings.

The settings are stored as a bytes blob in the `Session` structure returned by
`getJoinableSessions`. These can be abi-decoded according to the specification supplied in the
`GameConfig` struct (in the `initialSettingsManifest` struct).

These specification are made of a list of `SettingDeclaration` structs, which have a string name, a
`ValueType` indicating if the value is a `bool`, `int256`, `uint256`, `address`, `string`, `bytes`
or `enum`. In case it is an enum, a list of valid string values is also supplied in the struct.

The game room list should have a button to create a new game room. The button should open a modal or
new screen that lets the creator picks the value of the initial settings. The frontend then needs to
abi-encode the values according to their types (enum values should be encoded as strings) and then
send the `createSession` transaction. Afterward, the creator should join the game automatically (see
below) and is redirected to the game room page.

TODO: specify joining games

### Game Room (Lobby) Page

On this page, the players that have joined are listed (addresses, or ENS if available — can use
Thorin here for the bounty), alongside with their per-player settings.

The page should also display "global start settings" which are decided by the game creator (possibly
in conceration with the players).

We can get inspiration from this screenshot:

![Screenshot of the lobby page](https://interfaceingame.com/screenshots/starcraft-ii-legacy-of-the-void-lobby/)

Players are on the left, in this case the selection faction, color and handicap are per-player
settings, while the global settings are listed in the panel on the right.

We will also have a chat box at the bottom of this screen.

This page should let player change their settings, and the game creator change the global settings.

It should have a button for the game creator to lock the settings, and one for him to start the
game. On the player side, there should be a button to mark oneself as "ready".

Ideally, the game creator should lock the global settings, then each player would mark itself as
"ready". Once all players are ready, the game creator is allowed to start the game.

When player change the settings, a Waku message is sent to signal this. Same when the game creator
changes the settings.

Locking the global settings and marking oneself as ready should also send a Waku message, which will
include a signature from the players. The players should sign over the hash of their own settings +
the hash of the global settings. These signatures will be verified on the contract side.

TODO: implement signature verification in the contract

When the creator starts the game, it should send the `startSession` transaction that carries the
global settings and the per-user settings (no need to reinclude the initial settings). This will in
turn call a callback specified when the game was registered with the Vapor contract.

Once the game starts, the game creator should send the screen transition to the game proper (to be
defined by the dev integrating the Vapor SDK).

## Contracts

See [the source](../packages/contracts/src/Vapor.sol).

In addition to the aforementionned `getJoinableSessions`, `createSession` and `startSession`
functions, there is also `registerGame` and `completeSession`.

`registerGame` is called by the game creator to register the game. It takes the game name, the
specifications of the various settings for the game and two callbacks (one to validate, parse and
store the initial settings, one to validate, parse and store the game-start settings as well as
actually trigger the stat of the game). It also specifies an `authority` address which is allowed to
call `completeSession` on the game.

`completeSession` is called by the authority to mark the session as complete. For now this simply
marks the session as complete, but in the future we could include additional features, such as
recording the result of the game, awarding rewards, or resolving bets.

## p2p Communication

p2p (via Waku) is used inside the lobby to communicate setting changes, setting locks, and player
readyness, as well as to allow players to chat together.

We communicate via protobuf messages, of the following types:

- `changePlayerSettings` — sent by a player to signal a change in their settings
- `changeGlobalSettings` — sent by the game creator to signal a change in the global settings
- `lockGlobalSettings` — sent by the game creator to signal that the global settings are locked
- `markPlayerReady` — sent by a player to signal that they are ready

A different type of message is sent for chatting.

All messages must include signatures (for authentication). For `lockGlobalSettings` the signature
should be on the hash of the byte-encoded global settings. For `markPlayerReady` the signature
should be on the hash of the byte-encoded player settings + the hash of the byte-encoded global
settings.