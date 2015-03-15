var React = require('react');
var GameClientActions = require('../actions/GameClientActions');

// Day component
var Day = React.createClass({

  // End day via Actions
  endDay: function(){
    socket.emit('clientMessage', 'Yo server');
    GameClientActions.endDay();
  },
  
  // Render day component
  render: function() {
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