var AppDispatcher = require('../dispatcher/AppDispatcher');
var GameConstants = require('../constants/GameConstants');

var ActionTypes = GameConstants.ActionTypes;

// Define action types aka event names
var ConnectionActions = {
  createRoom: function() {
    AppDispatcher.handleAction({
      actionType: ActionTypes.CREATE_ROOM
    });
  }
};

module.exports = ConnectionActions;
