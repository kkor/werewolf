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

module.exports = WolvesKilled;