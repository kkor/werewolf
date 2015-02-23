var AppDispatcher = require('../dispatcher/AppDispatcher');
var GameConstants = require('../constants/GameConstants');

var ActionTypes = GameConstants.ActionTypes;

// Define action types aka event names
var GameControlActions = {

  // End night
  endNight: function() {
    AppDispatcher.handleAction({
      actionType: ActionTypes.NEXT_PHASE
      // could have other data also
      // data: { nextPhase: 'DAY' }
    });
  },
  // End day
  endDay: function() {
    AppDispatcher.handleAction({
      actionType: ActionTypes.NEXT_PHASE
      // could have other data also
      // data: { nextPhase: 'DAY' }
    });
  }

};

module.exports = GameControlActions;
