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
    var killed = this.props.killed

    return (
      <div className={"night"}>
          <p>You killed {killed}</p>
          <button type="button" onClick={this.pressOk}>
            OK
          </button>
      </div>
    );
  },

});

module.exports = VillageKilled;