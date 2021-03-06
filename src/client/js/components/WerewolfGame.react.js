var React = require('react');
var Router = require('react-router');

var Day = require('./Day.react');
var GameConstants = require('../../../common/GameConstants');
var GameOver = require('./GameOver.react');
var GameStore = require('../stores/GameStore');
var PlayerStore = require('../stores/PlayerStore');
var Lobby = require('./Lobby.react');
var Night = require('./Night.react');
var VillageKilled = require('./VillageKilled.react');
var VillageVote = require('./VillageVote.react');
var WolvesAwake = require('./WolvesAwake.react');
var WolvesAwakeVillager = require('./WolvesAwakeVillager.react');
var WolvesKilled = require('./WolvesKilled.react');

var GamePhases = GameConstants.GamePhases;
var GameRoles = GameConstants.GameRoles;
var RoleStates = GameConstants.RoleStates;

// Method to retrieve state from Stores
function getGameState() {
  console.log('Gamestate is: ' + JSON.stringify(GameStore.getGameState()));
  return {
    gameState: GameStore.getGameState(),
    playerState: PlayerStore.getPlayerState(),
  };
}

function renderGamePhase(phase, role, gameState) {
  switch (phase) {
    case GamePhases.LOBBY:
      return <Lobby />;
    case GamePhases.NIGHT:
      return <Night />;
    case GamePhases.WOLVES_AWAKE:
      switch (role) {
        case GameRoles.VILLAGER:
          return <WolvesAwakeVillager />;
        case GameRoles.WOLF:
          return <WolvesAwake />;
        default:
          return <WolvesAwake />;
      }
    case GamePhases.WOLVES_KILLED:
      return <WolvesKilled killed={ gameState.last_kill } />;
    case GamePhases.WOLVES_TIE:
      return <WolvesAwake />;
    case GamePhases.DAY:
      return <Day killed={ gameState.last_kill } />;
    case GamePhases.VILLAGE_VOTE:
      return <VillageVote />;
    case GamePhases.VILLAGE_TIE:
      return <VillageVote />;
    case GamePhases.VILLAGE_KILLED:
      return <VillageKilled killed={ gameState.last_kill } />;
    case GamePhases.VILLAGE_WON:
      return <GameOver message={ "Villagers win!" } />;
    case GamePhases.WOLVES_WON:
      return <GameOver message={ "Wolves win!" } />;
    default:
      // error
      console.log('error, no matching game phase', phase);
  }
}

// Define main Controller View
var WerewolfGame = React.createClass({

  // Get initial state from stores
  getInitialState: function() {
    GameStore.resetGameState();

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
    var role = this.state.playerState.role;

    console.log('Render phase: ' + phase);
    console.log('Render state: ' + JSON.stringify(this.state.gameState));

    var content;
    if (phase === GamePhases.LOBBY || this.state.playerState.status === RoleStates.ALIVE ) {
      content = renderGamePhase(phase, role, gameState);
    } else {
      content = <div>You are dead.</div>;
    }

    return (
      <div className='werewolf-app'>
        { content }
      </div>
    );
  },

  // Method to setState based upon Store changes
  _onChange: function() {
    this.setState(getGameState());
  },

});

module.exports = WerewolfGame;
