var React = require('react');
var WerewolfApp = require('./components/WerewolfApp.react');
window.React = React; // export for http://fb.me/react-devtools

// Render WerewolfApp Controller View
React.render(
  <WerewolfApp />,
  document.getElementById('werewolf')
);
