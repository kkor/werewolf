// The dispatcher only exists to send messages from views to stores.

// The are two types of action handlers `handleViewAction`
// and `handleServerAction` here. But since we have no extra
// pre-processing or logging for each, these could be combined

var Dispatcher = require('flux').Dispatcher;
var GameConstants = require('../constants/GameConstants');
var PayloadSources = GameConstants.PayloadSources;
var assign = require('object-assign');

var WerewolfAppDispatcher = assign(new Dispatcher(), {

  /**
   * @param {object} action The details of the action, including the action's
   * type and additional data coming from the server.
   */
  handleServerAction: function(action) {
    var payload = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    };
    this.dispatch(payload);
  },

  /**
   * @param {object} action The details of the action, including the action's
   * type and additional data coming from the view.
   */
  handleViewAction: function(action, player) {
    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  }

});

module.exports = WerewolfAppDispatcher;
