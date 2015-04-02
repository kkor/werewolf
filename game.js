var _ = require('underscore');
var GameConstants = require('./public/js/constants/GameConstants');

var GamePhases = GameConstants.GamePhases;
var GameRoles = GameConstants.GameRoles;
var RoleStates = GameConstants.RoleStates;

var Game = function(playerList, roles) {
	var players = [];

	var initPlayers = function() {

	  function initPlayer(role) {
	    var randomIndex = Math.floor(Math.random() * playerList.length);
	    var playerName = playerList.splice(randomIndex, 1)[0];
	    players.push({
	      name: playerName,
	      role: role,
	      state: RoleStates.ALIVE,
	      votes: 0, // TODO reset to 0 on death
	    });
	  }

	  _(roles.wolves).times(function() {
	    initPlayer(GameRoles.WOLF);
	  });

	  _(roles.seers).times(function() {
	    initPlayer(GameRoles.SEER);
	  });

	  _(roles.villagers).times(function() {
	    initPlayer(GameRoles.VILLAGER);
	  });
	};

	
	initPlayers();

	var gameState = {
		phase: GamePhases.LOBBY,
		players: players,
		roles:roles
	};

	var getPlayers = function() {
		return players;
	};

	var getRoles = function() {
		return roles;
	};

	var getGameState = function() {
		return gameState;
	};

	var resetVotes = function() {
		_.each(gameState.players, function(player) {
			player.votes = 0;
		});
	};

	var nextPhase = function(player, action) {
		var currentPhase = gameState.phase;
		switch(currentPhase) {
	    case GamePhases.LOBBY:
	      gameState.phase = GamePhases.NIGHT;
	      break;
	    case GamePhases.NIGHT:
	      gameState.phase = GamePhases.WOLVES_AWAKE;
	      break;
	    case GamePhases.WOLVES_AWAKE:
	    	//TODO error checking
	    	wolfChoice(action);
	      break;
	    case GamePhases.WOLVES_TIE:
	      gameState.phase = GamePhases.WOLVES_AWAKE;
	      break;
	    case GamePhases.WOLVES_KILLED:
	      gameState.phase = GamePhases.DAY;
	      break;
	    default:
	      return true;
  	}
		return gameState;
	};

	var wolfChoice = function(playerName) {
		if(gameState.phase == GamePhases.WOLVES_TIE) {
			nextPhase();
			resetVotes();
		}

		var totalVotes = 0;
		// add vote for player
		_.each(gameState.players, function(player) {
			if (player.name === playerName) {
				player.votes++;
				if(player.state !== RoleStates.ALIVE) {
					//throw error
				}
			}
			totalVotes = totalVotes + player.votes;
		});

		if(roles.wolves === totalVotes) {
			// all players voted
			var mostVotesCount = _.max(gameState.players, function(player){ return player.votes; }).votes;
			console.log("mostvo", mostVotesCount);
			var mostVotedPlayers = _.where(gameState.players, {votes: mostVotesCount});
			console.log("mostvoPL", mostVotedPlayers);

			
			if (mostVotedPlayers.length === 1) {
				// wolves killed
				gameState.phase = GamePhases.WOLVES_KILLED;
				_.each(gameState.players, function(player) {
					if(player.name === mostVotedPlayers[0].name) {
						player.state = RoleStates.KILLED;
					}
				});
			} else {
				// a tie
				gameState.phase = GamePhases.WOLVES_TIE;
			}
		}

		console.log("game.js, Create game: ", gameState);

		return gameState;
	};

	return {
		getPlayers: getPlayers,
		getRoles: getRoles,
		getGameState: getGameState,
		nextPhase: nextPhase,
		wolfChoice: wolfChoice,
	};
};

exports.Game = Game;