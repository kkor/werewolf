/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var socket = require('./sockets.js');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var path = require('path');

var app = express();
var server = http.createServer(app);

// Hook Socket.io into Express
var io = require('socket.io').listen(server);

// Configuration

console.log(__dirname);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, '../../public')));


if ('development' == app.get('env')) {
  app.use(errorHandler({ dumpExceptions: true, showStack: true }));
}

if ('production' == app.get('env')) {
  app.use(errorHandler());
}

// Socket.io Communication

io.sockets.on('connection', socket);

// Start server

server.listen(process.env.PORT || 3000, function () {
  console.log('Express server listening on port 3000');
});

// Game testing
/* players = ["Anton", "Bill", "Claire", "David"]; // temp
roles = { // temp
		wolves: 2,
		seers: 0,
		villagers: 2
	};
var werewolf = new Game(players,roles);

console.log("Game starting with state: ", werewolf.getGameState(), "\n");

console.log("everyone presses OK in lobby");
werewolf.nextPhase(); // -> night
console.log("Game state: ", werewolf.getGameState(), "\n");

console.log("everyone presses ok closed my eyes");
werewolf.nextPhase(); // -> werewolves awake
console.log("Game state: ", werewolf.getGameState(), "\n");

console.log("one werewolf presses a name");
werewolf.wolfChoice("Bill");
console.log("Game state: ", werewolf.getGameState(), "\n");
console.log("all werewolves pressed a name");
werewolf.wolfChoice("Anton");
console.log("Game state: ", werewolf.getGameState(), "\n");

console.log("after tie, one werewolf presses a name");
werewolf.wolfChoice("Bill");
console.log("Game state: ", werewolf.getGameState(), "\n");
console.log("all werewolves pressed a name");
werewolf.wolfChoice("Bill");
console.log("Game state: ", werewolf.getGameState(), "\n");*/
