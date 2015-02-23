// Key Concept: A store is not a model. A store contains models.
// Key concept: A store is the only thing in your application that
// knows how to update data. This is the most important part of Flux.

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var GameConstants = require('../constants/GameConstants');
var _ = require('underscore');

var ActionTypes = GameConstants.ActionTypes;
var GamePhases = GameConstants.GamePhases;
var GameRoles = GameConstants.GameRoles;
var RoleStates = GameConstants.RoleStates;
var CHANGE_EVENT = 'change';

// Define initial data points
var currentGameState = {
  phase: GamePhases.NIGHT
};

// Set game state DEPRECATED
function setGameState() {
  if(currentGameState == GamePhases.NIGHT) {
    currentGameState.phase = GamePhases.DAY;
  } else {
    currentGameState.phase = GamePhases.NIGHT;
  }
}

// Set game state
function setGameState(state) {
  currentGameState = state;
}

// Global object representing game data and logic
// Extend Game Store with EventEmitter to add eventing capabilities
var GameStore = _.extend({}, EventEmitter.prototype, {

  // Return game state
  getGameState: function() {
    return currentGameState;
  },

  // Emit Change event
  emitChange: function() {
    this.emit('change');
  },

  // Add change listener
  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  // Remove change listener
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

// Game store responds to these dispatched events:
AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {

    case ActionTypes.GAME_STATE_CHANGE:
      setGameState(action.gameState);
      break;

    // Deprecatd
    case ActionTypes.NEXT_PHASE:
      setGameState();
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  GameStore.emitChange();

  return true; // Needed for Flux promise resolution
});

module.exports = GameStore;
