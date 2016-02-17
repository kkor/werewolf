var roomData = require('./public/js/rooms').roomData;
var Game = require('./game.js').Game;

// export function for listening to the socket
module.exports = function (socket) {

  var broadcastGameState = function(code, gameState) {
    console.log("broadcastGameState:", code, JSON.stringify(gameState), "\n");
    socket.broadcast.to(code).emit("gameState:change", gameState);
    socket.emit("gameState:change", gameState);
  };

  var broadcastJoinedRoom = function(code, name) {
    console.log("broadcastJoinedRoom:", code, name);
    socket.emit("joined:room", {
      'room': code,
      'name': name,
	  'host' : roomData[code].host
    });
    
    socket.broadcast.to(code).emit("playerList:change", { 'list' : roomData[code].players});
    socket.emit("playerList:change", { 'list' : roomData[code].players});
  };

  // broadcast a user's message to other users
  socket.on('pressed:button', function (data) {
    console.log("Client pressed button: ", data);

    if(!data || !data.player || !data.player.room) {
      console.log("No player data!");
      return;
    }

    var code = data.player.room;
    var game = roomData[code].game;

    if(!game) {
      console.log("No game data!");
      return;
    }

    game.nextPhase(data.player.name, data.action);
    broadcastGameState(code, game.getGameState());
  });
  
  socket.on('create:room', function(data) {
    console.log("Got a message about creating a room!", data);
  	var code = Math.floor(Math.random() * 1000);
  	console.log("Created id:" + code);

  	socket.join(code, function(err) {
  	  var rooms = socket.rooms[1];
  	  console.log("Rooms: " + rooms);
  	});

  	var hostName = data.hostName;
  	roomData[code] = {};
    roomData[code].players = [hostName];
	roomData[code].host = hostName;
  	console.log("Room data: " + JSON.stringify(roomData));

    broadcastJoinedRoom(code, hostName);
  });
  
  socket.on('join:room', function(data) {
    console.log("Got a message about joining a room!");
  	var code = data.code;
  	var name = data.name;
  	console.log("Wanting to join room: " + code);

    if (code in roomData) {

        socket.join(code, function(e) {
            var playerAmount = 3
			console.log("Max players is: " + playerAmount)
            var players = roomData[code].players;

            if (players.length === playerAmount) {
                console.log("Room full!");
                return;
            }

            players.push(name);
            console.log("Room data: " + JSON.stringify(roomData));

            if (players.length < 3) {
                broadcastJoinedRoom(code, name);
            } else if (players.length === 3) {
                roles = { // temp
                    wolves: 1,
                    seers: 0,
                    villagers: 2
                };

                var werewolfGame = new Game(players.slice(), roles);
                roomData[code].game = werewolfGame;

                console.log("Created game: " + JSON.stringify(werewolfGame.getGameState()));

                broadcastJoinedRoom(code, name);

                broadcastGameState(code, werewolfGame.getGameState());
            } else {
                // error
            }
        });

    } else {
      console.log("No room with such ID found!");
      socket.emit("notfound:room");
    }
	
  });
};