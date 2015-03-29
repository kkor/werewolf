var React = require('react');
var GameClientActions = require('../actions/GameClientActions');
var GameConstants = require('../constants/GameConstants');

// Night component
var Night = React.createClass({

  // End night via Actions
  endNight: function(){
    GameClientActions.pressedButton(GameConstants.GameActions.OK);
  },
  
  // Render night component
  render: function() {
    return (
      <div className={"night"}>
          <p>It is night. Press</p>
          <button type="button" onClick={this.endNight}>
            OK
          </button>
          <p>and close your eyes.</p>
      </div>
    );
  },

});

module.exports = Night;