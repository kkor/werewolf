var WerewolfAppDispatcher = require('../dispatcher/WerewolfAppDispatcher');
var GameConstants = require('../constants/GameConstants');

var ActionTypes = GameConstants.ActionTypes;

// Define action types aka event names
var GameServerActions = {
  updateGameState: function(gameState) {
    WerewolfAppDispatcher.handleServerAction({
      actionType: ActionTypes.UPDATE_GAMESTATE,
      gameState: gameState
    });
  },

  joinedRoom: function(data) {
    WerewolfAppDispatcher.handleServerAction({
      actionType: ActionTypes.SET_PLAYER,
      data: data
    });
  },

  updatePlayers: function(data) {
   WerewolfAppDispatcher.handleServerAction({
      actionType: ActionTypes.UPDATE_PLAYERS,
      data: data
    }); 
  },
  
  updatePlayerRole: function(data) {
   WerewolfAppDispatcher.handleServerAction({
      actionType: ActionTypes.UPDATE_PLAYER_ROLE,
      data: data
    }); 
  }
  
};

module.exports = GameServerActions;
