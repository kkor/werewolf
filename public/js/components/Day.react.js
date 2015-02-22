var React = require('react');
var GameActions = require('../actions/GameActions');
var GameConstants = require('../constants/GameConstants');
var socket = require('../clientsocket').socket;

var GameStates = GameConstants.GameStates;

// Day component
var Day = React.createClass({

  // End day via Actions
  endDay: function(){
    socket.emit('clientMessage', 'Yo server');
    GameActions.endDay();
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