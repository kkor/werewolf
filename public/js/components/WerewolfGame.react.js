var React = require('react');
var Router = require('react-router');
var GameStore = require('../stores/GameStore');
var GameConstants = require('../constants/GameConstants');
var Lobby = require('./Lobby.react');
var Night = require('./Night.react');
var WolvesAwake = require('./WolvesAwake.react');
var WolvesKilled = require('./WolvesKilled.react');
var Day = require('./Day.react');


var GamePhases = GameConstants.GamePhases;

// Method to retrieve state from Stores
function getGameState() {
  console.log("Gamestate is: " + GameStore.getGameState());
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
    var gameState = this.state.gameState;
	console.log("Phase: " + phase);
	console.log("State: " + this.state.gameState);
    switch(phase) {
      case GamePhases.LOBBY:
        return <Lobby/>;
      case GamePhases.NIGHT:
        return <Night/>;
      case GamePhases.WOLVES_AWAKE:
        return <WolvesAwake/>;
      case GamePhases.WOLVES_KILLED:
        return <WolvesKilled players={gameState.players} />;
      case GamePhases.WOLVES_TIE:
        return <WolvesAwake/>;
      case GamePhases.DAY:
        return <Day/>;
      default:
        // error
        console.log("error, no matching game phase", phase);
    }
  },

  // Method to setState based upon Store changes
  _onChange: function() {
    this.setState(getGameState());
  }

});

module.exports = WerewolfGame;