var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var WerewolfGame = require('./components/WerewolfGame.react');
var NewGame = require('./components/NewGame.react');
var GameClientActions = require('./actions/GameClientActions');
var GameServerActions = require('./actions/GameServerActions');

window.React = React; // export for http://fb.me/react-devtools

var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var socket = require('./clientsocket').socket;

var App = React.createClass({
  mixins: [ Router.State ],

  render: function () {
    var name = this.getRoutes().reverse()[0].name;

    return <RouteHandler key={name}/>;
  }
});

var Index = React.createClass({
  mixins: [ Router.Navigation ],

  getInitialState: function(){
    socket.on('joined:room', this.joinedRoom);
    socket.on('playerList:change', this.updatePlayerList);
	  socket.on('gameState:change', this.updateGameState);

    return null;
  },

  // Server events 
  joinedRoom: function (data) {
    GameServerActions.joinedRoom(data);
  },

  updatePlayerList: function(data) {
    console.log("app.js, updatePlayerList(): " + JSON.stringify(data));
    GameServerActions.updatePlayers(data);
  },

  updateGameState : function(gameState){
    console.log('app.js, update Game state(): ', JSON.stringify(gameState));
    GameServerActions.updateGameState(gameState);
  },

  // Client events
  joinGame: function (event) {
    event.preventDefault();
  	var code = this.refs.code.getDOMNode().value;
  	var name = this.refs.name.getDOMNode().value;
  	socket.emit('join:room', { 'code' : code, 'name' : name });
    console.log("emit join:room", { 'code' : code, 'name' : name });

    this.transitionTo('werewolf-game', {
      "code": this.refs.code.getDOMNode().value,
      "name": name
    });
  },
  
  createGame: function (event) {
    event.preventDefault();
  	var hostName = this.refs.hostName.getDOMNode().value;

    GameClientActions.createRoom(hostName);

    this.transitionTo('new-game');
  },
  
  render: function () {
    return (
      <div>
        <form onSubmit={this.createGame}>
		  <p>
            <input type="text" ref="hostName" placeholder="Your name"/>
          </p>
		  <p>
              <button type="submit">Create Game</button>
          </p>
        </form>
        <div>or</div>
        <form onSubmit={this.joinGame}>
          <p>
            <input type="text" ref="code" placeholder="Room code"/>
          </p>
          <p>
            <input type="text" ref="name" placeholder="Your name"/>
          </p>
          <p>
            <button type="submit">Join Game</button>
          </p>
        </form>
      </div>
    );
  }
});

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={Index}/>
    <Route name="new-game" handler={NewGame} addHandlerKey={true} />
    <Route name="werewolf-game" handler={WerewolfGame} addHandlerKey={true} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});

module.exports = socket;
