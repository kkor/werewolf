var React = require( 'react' );
var GameClientActions = require( '../actions/GameClientActions' );
var GameConstants = require( '../../../common/GameConstants' );
var PlayerStore = require( '../stores/PlayerStore' );

var { playSound } = require( '../utils/sounds' );

// Night component
var Night = React.createClass( {

  getInitialState: function () {
    return PlayerStore.getPlayerState();
  },

  // Add change listeners to stores
  componentDidMount: function () {
    playSound('everyone-sleep', this.state.isHost);
    PlayerStore.addChangeListener( this._onChange );
  },

  // Remove change listers from stores
  componentWillUnmount: function () {
    PlayerStore.removeChangeListener( this._onChange );
  },

  // End night via Actions
  endNight: function () {
    GameClientActions.pressedButton( GameConstants.GameActions.OK );
  },

  // Render night component
  render: function () {
    var status = this.state.status;
    var role = this.state.role;
    return (
    <div className={ "night" }>
      <p>
        You are a
        { role }
      </p>
      <p>
        You are:
        { status }
      </p>
      <p>
        It is night. Press
      </p>
      <button type="button" onClick={ this.endNight }>
        OK
      </button>
      <p>
        and close your eyes.
      </p>
    </div>
    );
  },

  // Method to setState based upon Store changes
  _onChange: function () {
    this.setState( PlayerStore.getPlayerState() );
  },

} );

module.exports = Night;
