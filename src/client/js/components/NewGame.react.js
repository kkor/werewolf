var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var GameStore = require('../stores/GameStore');
var GameConstants = require('../../../common/GameConstants');
var GameServerActions = require('../actions/GameServerActions');
var GameClientActions = require('../actions/GameClientActions');

function getGameState() {
  console.log('Gamestate is: ', JSON.stringify(GameStore.getGameState()));
  return {
    gameState: GameStore.getGameState(),
  };
}

// NewGame component
var NewGame = React.createClass({
  mixins: [Router.Navigation],

  // Get initial state from stores
  getInitialState: function() {

    // Component state for form field values
    return {
      gameState: getGameState(),
      totalAmount: '',
      wolfAmount: '',
      seerAmount: '',
      error: '',
    };
  },

  // Add change listeners to stores
  componentDidMount: function() {
    GameStore.addChangeListener(this._onChange);
  },

  // Remove change listers from stores
  componentWillUnmount: function() {
    GameStore.removeChangeListener(this._onChange);
  },

  setupGame: function() {

    settings = {};
    settings['playerAmount'] = this.state.totalAmount;
    settings['wolfAmount'] = this.state.wolfAmount;
    settings['seerAmount'] = this.state.seerAmount;

    GameClientActions.saveSettings(settings);
    GameServerActions.updateSettings(settings);

    // routing
    this.replaceWith('werewolf-game');
  },

  onChange: function(key, event) {
    var value = {};
    value[key] = event.target.value;
    this.setState(value);
  },

  render: function() {
    return (
      <div className='werewolf-app'>
        <form onSubmit={ this.setupGame }>
          <p>
            <label>
              Amount of players
            </label>
          </p>
          <p>
            <input type="text"
              placeholder="Amount of players"
              value={ this.state.totalAmount }
              onChange={ this.onChange.bind(this, 'totalAmount') } />
          </p>
          <p>
            <label>
              Amount of wolves
            </label>
          </p>
          <p>
            <input type="text"
              placeholder="Amount of wolves"
              value={ this.state.wolfAmount }
              onChange={ this.onChange.bind(this, 'wolfAmount') } />
          </p>
          { /* <p>
            			    <label> Amount of seers </label>
            		  </p>
                		  <p>
                        <input
                          type="text"
                          placeholder="Amount of seers"
                          value={this.state.seerAmount}
                          onChange={this.onChange.bind(this, 'seerAmount')}/>
                      </p>*/ }
          <p>
            <button type="button" onClick={ this.setupGame }>
              Setup game
            </button>
          </p>
        </form>
      </div>

    );
  },

  // Method to setState based upon Store changes
  _onChange: function() {
    this.setState(getGameState());
  },


});

module.exports = NewGame;
