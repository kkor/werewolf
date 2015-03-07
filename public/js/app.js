var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var WerewolfGame = require('./components/WerewolfGame.react');
var NewGame = require('./components/NewGame.react');
var GameClientActions = require('./actions/GameClientActions');

window.React = React; // export for http://fb.me/react-devtools

var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var socket = require('./clientsocket').socket;

var Users = [];
var Messages = [];


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

    socket.on('init', this.initialize);
    socket.on('send:message', this.messageRecieve);
    socket.on('user:join', this.userJoined);
    socket.on('user:left', this.userLeft);
    socket.on('change:name', this.userChangedName);
    socket.on('clientMessage', this.changedState);
	socket.on('playerlist', this.updatePlayerList);

    return {users: [], messages:[], text: ''};
  },

  initialize: function(data){
    this.setState({ users: data.users, user: data.name});
  },

  messageRecieve: function(message){
    this.state.messages.push(message);
    this.setState();
  },

  userJoined: function(data){
    this.state.users.push(data.name);
    this.state.messages.push({
      user: 'APLICATION BOT',
      text : data.name +' Joined'
    });
    this.setState();
  },

  userLeft: function(data){
    var index = this.state.users.indexOf(data.name);
    this.state.users.splice(index, 1);
    this.state.messages.push({
      user: 'APLICATION BOT',
      text : data.name +' Left'
    });
    this.setState();

  },

  userChangedName : function(data){
    var oldName = data.oldName;
    var newName = data.newName;
    this.state.users.splice(this.state.users.indexOf(oldName), 1, newName);
    this.state.messages.push({
      user: 'APLICATION BOT',
      text : 'Change Name : ' + oldName + ' ==> '+ newName
    });
    this.setState();

  },

  handleMessageSubmit : function(message){
    this.state.messages.push(message);
    this.setState();

    socket.emit('send:message', message);
  },

  handleChangeName : function(newName){
    var that = this;
    var oldName = this.state.user;
    socket.emit('change:name', { name : newName}, function(result){
      if(!result){
        alert('There was an error changing your name');
      }else{
        var index = that.state.users.indexOf(oldName);
        that.state.users.splice(index, 1, newName);
        that.setState();
      }
    });
  },
  
  changedState : function(message){
    console.log('Received state change message!');
	GameClientActions.endDay();
  },

  joinGame: function (event) {
    event.preventDefault();
	var code = this.refs.code.getDOMNode().value;
	var name = this.refs.name.getDOMNode().value;
	socket.emit('join:room', { 'code' : code, 'name' : name });
    this.transitionTo('new-game', { code: this.refs.code.getDOMNode().value });
  },
  
  createGame: function (event) {
    event.preventDefault();
	var host_name = this.refs.host_name.getDOMNode().value;
	socket.emit('create:room', { 'host_name' : host_name});
    this.transitionTo('new-game', { code: this.refs.code.getDOMNode().value });
  },
  
  updatePlayerList: function(data) {
	var list = data.list;
	console.log("Player list: " + list);
	GameClientActions.updatePlayers(list);
  },
  
  

  render: function () {
    return (
      <div>
        <p>Users:{this.state.users}</p>
        <form onSubmit={this.createGame}>
		  <p>
            <input type="text" ref="host_name" placeholder="Your name"/>
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
