var _ = require( 'lodash' );
var React = require( 'react' );
var GameStore = require( '../stores/GameStore' );
var GameConstants = require( '../../../common/GameConstants' );
var GameClientActions = require( '../actions/GameClientActions' );

var RoleStates = GameConstants.RoleStates;

function getGameState() {
  console.log( 'Gamestate is: ' + JSON.stringify( GameStore.getGameState() ) );
  return {
    gameState: GameStore.getGameState(),
  };
}

function renderVoter(voter) {
  return (
    <div className='voter'>
      <img src={ '/images/knife.png' } />
      <span className='name'>{ voter }</span>
    </div>
  );
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

  render: function() {
    var players = _.filter(this.state.gameState.players, ['state', RoleStates.ALIVE ]);

    var voting = players.map(function(player) {
      var votes;
      if (!_.isEmpty(player.votedBy)) {
        votes = (
          <div className='votes'>
            { player.votedBy.map(renderVoter) }
          </div>
        );
      }

      return [
        <tr>
          <td>
            <button className='vote-target' type="button" onClick={ this.killPlayer.bind(this, player.name) }>
              { player.name }
            </button>
          </td>
          <td className='vote-arrow'>&#65513; </td>
          <td className='min-size-column'>
            <div className='vote-count'>Votes: { player.votes }/TODO</div>
          </td>
        </tr>,
        <tr>
          <td colspan='2'></td>
          <td className='min-size-column'>
            { votes }
          </td>
        </tr>
      ];
    }, this);

    return (
      <div>
        <p className='info-text'>
          Who do you want to lynch?
        </p>
        <table className='voting'>
          <tbody>
            { voting }
          </tbody>
        </table>
      </div>
    );
  },

  // Method to setState based upon Store changes
  _onChange: function () {
    this.setState( getGameState() );
  },


} );

module.exports = VillageVote;
