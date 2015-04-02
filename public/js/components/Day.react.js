var React = require('react');
var GameClientActions = require('../actions/GameClientActions');
var PlayerStore = require('../stores/PlayerStore');

// Day component
var Day = React.createClass({

  getInitialState: function() {
    return PlayerStore.getPlayerState();
  },

  // Add change listeners to stores
  componentDidMount: function() {
    PlayerStore.addChangeListener(this._onChange);
  },

  // Remove change listers from stores
  componentWillUnmount: function() {
    PlayerStore.removeChangeListener(this._onChange);
  },

  // End day via Actions
  endDay: function(){
    socket.emit('clientMessage', 'Yo server');
    GameClientActions.endDay();
  },
  
  // Render day component
  render: function() {
    var status = this.state.status;
    return (
      <div className={"day"}>
          <p>This is day</p>
          <p> You are: {status} </p>
          <button type="button" className="end-day" onClick={this.endDay}>
            End day
          </button>
      </div>
    );
  },

   // Method to setState based upon Store changes
  _onChange: function() {
    this.setState(PlayerStore.getPlayerState());
  }


});

module.exports = Day;