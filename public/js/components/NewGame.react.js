var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ConnectionActions = require('../actions/ConnectionActions');

// NewGame component
var NewGame = React.createClass({
  mixins : [Router.Navigation],

  startGame: function() {
    //should set game settings to store

    // routing
    this.replaceWith('werewolf-game');
  },

  render: function() {
    var self = this;
    return (
      <div>
          Game Settings go here<br/>
          <button type="button" onClick={this.startGame}>Start game</button>
      </div>
    );
  },

});

module.exports = NewGame;