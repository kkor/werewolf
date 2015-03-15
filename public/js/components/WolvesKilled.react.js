var _ = require('underscore');
var React = require('react');
var GameClientActions = require('../actions/GameClientActions');
var GameConstants = require('../constants/GameConstants');

// WolvesKilled component
var WolvesKilled = React.createClass({

  pressOk: function(){
    GameClientActions.pressedButton(GameConstants.GameActions.OK);
  },
  
  render: function() {
    var players = this.props.players;
    var killed = _.findWhere(players, {"state": GameConstants.RoleStates.KILLED});

    return (
      <div className={"night"}>
          <p>You killed {killed.name}</p>
          <button type="button" onClick={this.pressOk}>
            OK
          </button>
      </div>
    );
  },

});

module.exports = WolvesKilled;