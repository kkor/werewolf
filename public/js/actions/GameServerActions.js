var AppDispatcher = require('../dispatcher/AppDispatcher');
var GameConstants = require('../constants/GameConstants');

var ActionTypes = GameConstants.ActionTypes;

// Define action types aka event names
var GameServerActions = {

  gameStarted: function() {
    AppDispatcher.handleAction({
      actionType: ActionTypes.NEXT_PHASE
      // could have other data also
      // data: { nextPhase: 'DAY' }
    });
  },
  playerJoined: function() {
    AppDispatcher.handleAction({
      actionType: ActionTypes.NEXT_PHASE
      // could have other data also
      // data: { nextPhase: 'DAY' }
    });
  }

};

module.exports = GameServerActions;
