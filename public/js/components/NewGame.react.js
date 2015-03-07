var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var GameStore = require('../stores/GameStore');
var GameConstants = require('../constants/GameConstants');

function getGameState() {
  console.log("Gamestate is: " + GameStore.getGameState());
  return {
    gameState: GameStore.getGameState()
  };
}



// NewGame component
var NewGame = React.createClass({
  mixins : [Router.Navigation],
  
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

  startGame: function() {
    //should set game settings to store

    // routing
    this.replaceWith('werewolf-game');
  },

  render: function() {
    var self = this;
	var players = this.state.gameState.players;
    return (
      <div>
          Game Settings go here<br/>
          <button type="button" onClick={this.startGame}>Start game</button>
		  <div>
	        <p> Players: {players} </p>
	      </div>
      </div>
	  
    );
  },
  
   // Method to setState based upon Store changes
  _onChange: function() {
    this.setState(getGameState());
  }


});

module.exports = NewGame;