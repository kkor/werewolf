var React = require('react');
var GameStore = require('../stores/GameStore');
var Night = require('./Night.react');

// Method to retrieve state from Stores
function getGameState() {
  return {
    gameState: GameStore.getGameState()
  };
}

// Define main Controller View
var WerewolfApp = React.createClass({

  // Get initial state from stores
  getInitialState: function() {
    return getGameState();
  },

  // Add change listeners to stores
  componentDidMount: function() {
    GameStore.addChangeListener(this._onChange);
  },

  // Remove change listers from stores
  componentWillUnmount: function() {
    GameStore.removeChangeListener(this._onChange);
  },

  // Render our child components, passing state via props
  render: function() {
  	return (
      <div className="werewolf-app">
        <Night gameState={this.state.gameState} />
        <button type="button" className="start-game" onClick={this.startGame}>Start new game</button>
      </div>
  	);
  },

  // Method to setState based upon Store changes
  _onChange: function() {
    this.setState(getGameState());
  }

});

module.exports = WerewolfApp;