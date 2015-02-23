var React = require('react');
var Router = require('react-router');
var GameStore = require('../stores/GameStore');
var GameConstants = require('../constants/GameConstants');
var Night = require('./Night.react');
var Day = require('./Day.react');


var GamePhases = GameConstants.GamePhases;

// Method to retrieve state from Stores
function getGameState() {
  return {
    gameState: GameStore.getGameState()
  };
}

// Define main Controller View
var WerewolfGame = React.createClass({

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
    var phase = this.state.gameState ? this.state.gameState.phase : null;
    switch(phase) {
      case GamePhases.LOBBY:
        return <LOBBY gameState={this.state.gameState} />;
      case GamePhases.NIGHT:
        return <Night gameState={this.state.gameState} />;
      case GamePhases.DAY:
        return <Day gameState={this.state.gameState} />;
      default:
        // blub
    }
  },

  // Method to setState based upon Store changes
  _onChange: function() {
    this.setState(getGameState());
  }

});

module.exports = WerewolfGame;