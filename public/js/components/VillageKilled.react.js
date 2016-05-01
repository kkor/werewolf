var _ = require('underscore');
var React = require('react');
var GameClientActions = require('../actions/GameClientActions');
var GameConstants = require('../constants/GameConstants');

// VillageKilled component
var VillageKilled = React.createClass({

  pressOk: function(){
    GameClientActions.pressedButton(GameConstants.GameActions.OK);
  },
  
  render: function() {
    var players = this.props.players;
    var killed = _.findWhere(players, {"state": GameConstants.RoleStates.KILLED});

    return (
      <div className={"night"}>
          <p>The village hanged {killed.name}</p>
          <button type="button" onClick={this.pressOk}>
            OK
          </button>
      </div>
    );
  },

});

module.exports = VillageKilled;