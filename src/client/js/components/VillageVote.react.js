var React = require( 'react' );
var GameStore = require( '../stores/GameStore' );
var GameConstants = require( '../../../common/GameConstants' );
var GameClientActions = require( '../actions/GameClientActions' );

function getGameState() {
  console.log( 'Gamestate is: ' + JSON.stringify( GameStore.getGameState() ) );
  return {
    gameState: GameStore.getGameState(),
  };
}

// VillageVote component
var VillageVote = React.createClass( {
  // Get initial state from stores
  getInitialState: function () {
    return getGameState();
  },

  // Add change listeners to stores
  componentDidMount: function () {
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
    <div>
      <p>
        Villagers vote now
      </p>
      <p>
        Who do you want to kill?
      </p>
      { players.map( function ( player ) {
          return <div>
                   <span>{ player.votes }, { JSON.stringify( player.votedBy ) }</span>
                   <button type="button" onClick={ this.killPlayer.bind( this, player.name ) }>
                     { player.name }
                   </button>
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

module.exports = VillageVote;
