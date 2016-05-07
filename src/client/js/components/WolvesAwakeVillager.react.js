var React = require('react');
var GameStore = require('../stores/GameStore');
var GameConstants = require('../../../common/GameConstants');
var GameClientActions = require('../actions/GameClientActions');
var sound = require('../utils/sounds');

function getGameState() {
  console.log('Gamestate is: ' + JSON.stringify(GameStore.getGameState()));
  return {
    gameState: GameStore.getGameState(),
  };
}

// WolvesAwakeVillager component
var WolvesAwakeVillager = React.createClass({
  // Get initial state from stores
  getInitialState: function() {
    return getGameState();
  },

  // Add change listeners to stores
  componentDidMount: function() {
    sound.playSound('2-wolves-wake-up', this.state.isHost);
    GameStore.addChangeListener(this._onChange);
  },

  // Remove change listers from stores
  componentWillUnmount: function() {
    sound.playSound('3-wolves-sleep', this.state.isHost);
    GameStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var r = Math.floor((Math.random() * 10) + 1);
    var phrase = r > 5 ? "Sleep tight, pupper!" : "Shh, no tears, only dreams now...";
    return (
      <div>
        <p>
          {phrase}
        </p>
      </div>
    );
  },

  // Method to setState based upon Store changes
  _onChange: function() {
    this.setState(getGameState());
  },


});

module.exports = WolvesAwakeVillager;
