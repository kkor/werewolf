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

var app = express();
var server = http.createServer(app);

// Hook Socket.io into Express
var io = require('socket.io').listen(server);

// Configuration

app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));


if ('development' == app.get('env')) {
  app.use(errorHandler({ dumpExceptions: true, showStack: true }));
}

if ('production' == app.get('env')) {
  app.use(errorHandler());
}

// Socket.io Communication

io.sockets.on('connection', socket);

// Start server

server.listen(3000, function(){
  console.log("Express server listening on port 3000");
});