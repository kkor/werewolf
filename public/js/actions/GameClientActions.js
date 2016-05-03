var WerewolfAppDispatcher = require( '../dispatcher/WerewolfAppDispatcher' );
var GameConstants = require( '../constants/GameConstants' );
var clientSocket = require( '../clientsocket' );
var PlayerStore = require( '../stores/PlayerStore' );

var ActionTypes = GameConstants.ActionTypes;

// Define action types aka event names
var GameClientActions = {

  createRoom: function ( hostName ) {
    clientSocket.createRoom( {
      hostName: hostName,
    } );
  },

  pressedButton: function ( data ) {
    var playerState = PlayerStore.getPlayerState();

    clientSocket.sendAction( {
      action: data,
      player: {
        room: playerState.room,
        name: playerState.name,
      },
    } );
  },

  saveSettings: function ( data ) {
    var playerState = PlayerStore.getPlayerState();

    clientSocket.saveSettings( {
      settings: data,
      room: playerState.room,
    } );
  },
};

module.exports = GameClientActions;
