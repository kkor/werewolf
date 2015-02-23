var React = require('react');
var GameClientActions = require('../actions/GameClientActions');
var GameConstants = require('../constants/GameConstants');
var socket = require('../clientsocket').socket;

var GameStates = GameConstants.GameStates;

// Night component
var Night = React.createClass({

  // End night via Actions
  endNight: function(){
    socket.emit('clientMessage', 'Yo server');
    GameClientActions.endNight();
  },
  
  // Render night component
  render: function() {
    var self = this, gameState = this.props.gameState;
    return (
      <div className={"night"}>
          <p>This is night</p>
          <button type="button" className="end-night" onClick={this.endNight}>
            { gameState === GameStates.NIGHT ? "End night" : "Start night" }
          </button>
      </div>
    );
  },

});

module.exports = Night;