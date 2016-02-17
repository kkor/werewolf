var React = require('react');
var GameStore = require('../stores/GameStore');
var PlayerStore = require('../stores/PlayerStore');
var GameConstants = require('../constants/GameConstants');
var GameClientActions = require('../actions/GameClientActions');

function getGameState() {
  console.log("Gamestate is: " + JSON.stringify(GameStore.getGameState()));
  console.log("Playerstate is: " + JSON.stringify(PlayerStore.getPlayerState()));
  return {
    gameState: GameStore.getGameState(),
    playerState: PlayerStore.getPlayerState()
  };
}

// Lobby component
var Lobby = React.createClass({
  // Get initial state from stores
  getInitialState: function() {
    return getGameState();
  },

  // Add change listeners to stores
  componentDidMount: function() {
    GameStore.addChangeListener(this._onChange);
    PlayerStore.addChangeListener(this._onChange);
  },

  // Remove change listers from stores
  componentWillUnmount: function() {
    GameStore.removeChangeListener(this._onChange);
    PlayerStore.removeChangeListener(this._onChange);
  },

  startGame: function() {
	console.log("Player list size: " + this.state.playerState.list.length);
	if (this.state.playerState.list.length === 3) {
      GameClientActions.pressedButton(GameConstants.GameActions.OK);
	}
    // TODO grey out button
  },

  render: function() {
    var players = this.state.playerState.list;
	var room = this.state.playerState.room;
	var max_players = '3'
	var full = this.state.playerState.list.length == max_players
    return (
      <div>
          <p>Room code: {room}</p>
		
          <p>Players joined: {players} </p>
          <p>You are playing with <span id="max">{max_players}</span> players:</p>
          <p>? Wolves</p>
          <p>1 Seer</p>
          <p>? Villagers</p>
          <button type="button" className={(!full) ? "disabled" : ""} onClick={this.startGame}>{(full) ? "Start game" : "Waiting for players"}</button>
		  </div>
    );
  },
  
   // Method to setState based upon Store changes
  _onChange: function() {
    this.setState(getGameState());
  }


});

module.exports = Lobby;