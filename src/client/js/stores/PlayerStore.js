// Key Concept: A store is not a model. A store contains models.
// Key concept: A store is the only thing in your application that
// knows how to update data. This is the most important part of Flux.

var WerewolfAppDispatcher = require( '../dispatcher/WerewolfAppDispatcher' );
var EventEmitter = require( 'events' ).EventEmitter;
var GameConstants = require( '../../../common/GameConstants' );
var _ = require( 'underscore' );

var ActionTypes = GameConstants.ActionTypes;
var GamePhases = GameConstants.GamePhases;
var GameRoles = GameConstants.GameRoles;
var RoleStates = GameConstants.RoleStates;
var CHANGE_EVENT = 'change';

var playerState = {};

// Set game state
function setGameState( state ) {
  currentGameState = state;
}

function setPlayer( data ) {
  playerState = data;
  /*playerState.room = data.room;
  playerState.isHost = data.isHost;
  playerState.name = data.name;
  playerState.role = 'undecided';
  playerState.status = 'ALIVE';*/
}

function setPlayerList( list ) {
  playerState.list = list;
  console.log( 'PlayerStore setPlayerList()', JSON.stringify( playerState ) );
}

function updatePlayerStatus( list ) {
  var me = _.find( list, function ( player ) {
    return player.name == playerState.name;
  } );
  playerState.status = me.state;
  playerState.role = me.role;
}

// Global object representing playerState data and logic
// Extend Game Store with EventEmitter to add eventing capabilities
var PlayerStore = _.extend( {}, EventEmitter.prototype, {

  // Return playerState data
  getPlayerState: function () {
    return playerState;
  },

  // Emit Change event
  emitChange: function () {
    this.emit( 'change' );
  },

  // Add change listener
  addChangeListener: function ( callback ) {
    this.on( 'change', callback );
  },

  // Remove change listener
  removeChangeListener: function ( callback ) {
    this.removeListener( 'change', callback );
  },

} );

// Game store responds to these dispatched events:
WerewolfAppDispatcher.register( function ( payload ) {
  var action = payload.action;

  switch (action.actionType) {
    case ActionTypes.SET_PLAYER:
      setPlayer( action.data );
      break;

    case ActionTypes.UPDATE_PLAYERS:
      setPlayerList( action.data.list );
      break;

    case ActionTypes.UPDATE_GAMESTATE:
      updatePlayerStatus( action.gameState.players );
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  PlayerStore.emitChange();

  return true; // Needed for Flux promise resolution
} );

module.exports = PlayerStore;
