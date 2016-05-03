var _ = require( 'underscore' );
var React = require( 'react' );
var GameClientActions = require( '../actions/GameClientActions' );
var GameConstants = require( '../constants/GameConstants' );

// GameOver component
var GameOver = React.createClass( {

  pressOk: function () {
    GameClientActions.pressedButton( GameConstants.GameActions.OK );
  },

  render: function () {
    var message = this.props.message;

    return (
    <div className={ "night" }>
      <p>
        The game is over!
      </p>
      <p>
        { message }
      </p>
      <button type="button" onClick={ this.pressOk }>
        OK
      </button>
    </div>
    );
  },

} );

module.exports = GameOver;
