var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var WerewolfApp = require('./components/WerewolfApp.react');
var NewGame = require('./components/NewGame.react');

window.React = React; // export for http://fb.me/react-devtools

var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  mixins: [ Router.State ],

  render: function () {
    var name = this.getRoutes().reverse()[0].name;

    return <RouteHandler key={name}/>;
  }
});

var Index = React.createClass({
  mixins: [ Router.Navigation ],

  joinGame: function (event) {
    event.preventDefault();
    this.transitionTo('werewolf-game', { code: this.refs.code.getDOMNode().value });
  },

  render: function () {
    return (
      <div>
        <Link to="new-game">Start new Game</Link>
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
    <Route name="werewolf-game" handler={WerewolfApp} addHandlerKey={true} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
