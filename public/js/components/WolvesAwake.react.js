var React = require( 'react' );
var GameStore = require( '../stores/GameStore' );
var GameConstants = require( '../constants/GameConstants' );
var GameClientActions = require( '../actions/GameClientActions' );

import { playSound } from '../utils/sounds';

function getGameState() {
  console.log( 'Gamestate is: ' + JSON.stringify( GameStore.getGameState() ) );
  return {
    gameState: GameStore.getGameState(),
  };
}

// WolvesAwake component
var WolvesAwake = React.createClass( {
  // Get initial state from stores
  getInitialState: function () {
    return getGameState();
  },

  // Add change listeners to stores
  componentDidMount: function () {
    playSound('everyone-sleep', this.state.isHost);
    GameStore.addChangeListener( this._onChange );
  },

  // Remove change listers from stores
  componentWillUnmount: function () {
    GameStore.removeChangeListener( this._onChange );
  },

  killPlayer: function ( name ) {
    GameClientActions.pressedButton( name );
  },

  render: function () {
    var players = this.state.gameState.players;
    return (
    <div className='voting'>
      <p>
        Who do you want to kill?
      </p>
      { players.map( function ( player ) {
          return (
            <div>
              <button className='vote-target' type="button" onClick={ this.killPlayer.bind(this, player.name) }>
                { player.name }
              </button>

              <span>{ player.votes }, { JSON.stringify(player.votedBy) }</span>
          </div>;
        }, this ) }
    </div>
    );
  },

  // Method to setState based upon Store changes
  _onChange: function () {
    this.setState( getGameState() );
  },


} );

module.exports = WolvesAwake;
