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
    console.log("app.jsx getInitialState(), clientsocket code:", require('./clientsocket').getCode());

    // Initialize sockets
    socket.on('joined:room', this.joinedRoom);
    socket.on('playerList:change', this.updatePlayerList);
	  socket.on('gameState:change', this.updateGameState);
    socket.on('notfound:room', this.roomNotFound);
	socket.on('join:full', this.fullRoom);

    // Component state for form field values
    return {
      hostNameValue: '',
      roomCodeValue: '',
      nameValue: '',
      error: '',
    };
  },

  // Server events 
  joinedRoom: function (data) {
    console.log("app.js, joinedRoom(): " + JSON.stringify(data));
    GameServerActions.joinedRoom(data.playerData);
	console.log("data settings is", data.settings);
	GameServerActions.updateSettings(data.settings);

    if(!data.playerData.room) {
      console.log("Error, no room code received");
    } else {
	  console.log("Comparing host name and player name");
	  if (data.playerData.name != data.playerData.host) { 
        this.transitionTo('werewolf-game', {
          "code": data.room,
          "name": data.name,
        });
	  }
    }
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

    console.log("Clicked 'Join game', roomCodeValue:", this.state.roomCodeValue);
    console.log("Clicked 'Join game', nameValue:", this.state.nameValue);

    if(!this.state.nameValue || !this.state.roomCodeValue) {
	  /*
	  var errorMessage = "Please specify both code and user name";
	  this.setState({
        error: errorMessage,
      }); */
      console.log("No name or code defined, TODO show error to user");
    } else {
      // TODO change this to a GameClientAction.joinRoom(...)
      socket.emit('join:room', { 'code' : this.state.roomCodeValue, 'name' : this.state.nameValue });
      console.log("emit join:room", { 'code' : this.state.roomCodeValue, 'name' : this.state.nameValue });
    }
  },
  
  createGame: function (event) {
    event.preventDefault();

    console.log("Clicked 'Create game', hostNameValue:", this.state.hostNameValue);

    if(!this.state.hostNameValue) {
      console.log("No name defined, TODO show error to user");
    } else {
      GameClientActions.createRoom(this.state.hostNameValue);

      // TODO update to react-router 2.0.0 and use browser history for navigation
      // or at least move this to a createdRoom actions success handler
      this.transitionTo('new-game');
    }
  },

  roomNotFound: function(event) {
    var errorMessage = "No room with that ID found";
    console.log(errorMessage);

    this.setState({
      error: errorMessage,
    });
  },
  
  fullRoom: function(event) {
    var errorMessage = "The room is full";
    console.log(errorMessage);

    this.setState({
      error: errorMessage,
    });
  },

  onChange: function(key, event) {
    var value = {};
    value[key] = event.target.value;
    this.setState(value);
  },
  
  render: function () {
    return (
      <div>
        <form onSubmit={this.createGame}>
    		  <p>
            <input
              type="text"
              placeholder="Your name"
              value={this.state.hostNameValue}
              onChange={this.onChange.bind(this, 'hostNameValue')}/>
          </p>
    		  <p>
            <button type="submit">Create Game</button>
          </p>
        </form>

        <div>or</div>

        <form onSubmit={this.joinGame}>
          <p>
            <input
              type="text"
              placeholder="Room code"
              value={this.state.roomCodeValue}
              onChange={this.onChange.bind(this, 'roomCodeValue')}/>
          </p>
          <p>
            <input
              type="text"
              placeholder="Your name"
              value={this.state.nameValue}
              onChange={this.onChange.bind(this, 'nameValue')}/>
          </p>
          <p>
            <button type="submit">Join Game</button>
          </p>
        </form>
        <p>{this.state.error}</p>
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
