// Key Concept: A store is not a model. A store contains models.
// Key concept: A store is the only thing in your application that
// knows how to update data. This is the most important part of Flux.

var WerewolfAppDispatcher = require('../dispatcher/WerewolfAppDispatcher');
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
  phase: GamePhases.LOBBY,
  settings: {}
};

// Set game state
function setGameState(state) {
  console.log("Set gameState", JSON.stringify(state));
  currentGameState = state;
}

function updateSettings(data) {
	currentGameState.settings = data;
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
WerewolfAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {

    case ActionTypes.UPDATE_GAMESTATE:
      setGameState(action.gameState);
      break;
	  
	case ActionTypes.UPDATE_SETTINGS:
	  updateSettings(action.data);
	  break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  GameStore.emitChange();

  return true; // Needed for Flux promise resolution
});

module.exports = GameStore;
