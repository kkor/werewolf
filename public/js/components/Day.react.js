var React = require('react');
var GameClientActions = require('../actions/GameClientActions');
var GameConstants = require('../constants/GameConstants');
var socket = require('../clientsocket').socket;

var GamePhases = GameConstants.GamePhases;

// Day component
var Day = React.createClass({

  // End day via Actions
  endDay: function(){
    socket.emit('clientMessage', 'Yo server');
    GameClientActions.endDay();
  },
  
  // Render day component
  render: function() {
    var self = this, gameState = this.props.gameState;
    return (
      <div className={"day"}>
          <p>This is day</p>
          <button type="button" className="end-day" onClick={this.endDay}>
            End day
          </button>
      </div>
    );
  },

});

module.exports = Day;