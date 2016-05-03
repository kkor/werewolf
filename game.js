var _ = require('underscore');
var GameConstants = require('./public/js/constants/GameConstants');

var GamePhases = GameConstants.GamePhases;
var GameRoles = GameConstants.GameRoles;
var RoleStates = GameConstants.RoleStates;
var GameOvers = GameConstants.GameOvers;

var Game = function(playerList, roles, settings) {
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
		  voted: false,
		  votedBy: [],
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
		roles:roles,
		settings:settings,
		last_kill:""
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
			player.voted = false;
			player.votedBy = [];
		});
	};
	
	var gameOver = function() {
		var value = GameOvers.NOT_OVER;
		var villagers = _.where(gameState.players, {role: GameRoles.VILLAGER, state: RoleStates.ALIVE});
		var wolves = _.where(gameState.players, {role: GameRoles.WOLF, state: RoleStates.ALIVE});
		value = (villagers.length <= wolves.length) ? GameOvers.WOLVES_WON : value;
		var wolves = _.where(gameState.players, {role: GameRoles.WOLF});
		alive = _.find(wolves, function(v) {
			return v.state == RoleStates.ALIVE;
		});
		value = alive === undefined ? GameOvers.VILLAGE_WON : value;
		return value;
	};
	
	var isOver = function() {
		var value = gameOver();
		if (value !== GameOvers.NOT_OVER) {
			gameState.phase = GamePhases.GAME_OVER;
		}
	};
	
	var whoWon = function() {
		var value = gameOver();
		if (value === GameOvers.WOLVES_WON) {
			gameState.phase = GamePhases.WOLVES_WON;
		}
		if (value === GameOvers.VILLAGE_WON) {
			gameState.phase = GamePhases.VILLAGE_WON;
		}
	};

	var nextPhase = function(player, action) {
		isOver();
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
	    	wolfChoice(action, player);
	      break;
	    case GamePhases.WOLVES_TIE:
	      gameState.phase = GamePhases.WOLVES_AWAKE;
	      break;
	    case GamePhases.WOLVES_KILLED:
		  resetVotes();
	      gameState.phase = GamePhases.DAY;
	      break;
		case GamePhases.DAY:
		  gameState.phase = GamePhases.VILLAGE_VOTE;
		  break;
		case GamePhases.VILLAGE_VOTE:
		  wolfChoice(action, player);
		  break;
		case GamePhases.VILLAGE_TIE:
		  gameState.phase = GamePhases.VILLAGE_VOTE;
	      break;
		case GamePhases.VILLAGE_KILLED:
		  resetVotes();
	      gameState.phase = GamePhases.NIGHT;
	      break;
		case GamePhases.GAME_OVER:
		  //maybe some cleaning
		  whoWon();
		  break;
	    default:
	      return true;
  	}
		return gameState;
	};

	var wolfChoice = function(playerName, voterName) {
		voter = _.findWhere(gameState.players, { name: voterName });
		if (voter.voted || voter.state === RoleStates.KILLED || (gameState.phase == GamePhases.WOLVES_AWAKE && voter.role != GameRoles.WOLF)) {
			return;
		}
		if(gameState.phase == GamePhases.WOLVES_TIE || gameState.phase == GamePhases.VILLAGE_TIE) {
			nextPhase();
			resetVotes();
		}

		var totalVotes = 0;
		// add vote for player
		_.each(gameState.players, function(player) {
			if (player.name === playerName && player.state === RoleStates.ALIVE) {
				player.votes++;
				voter.voted = true;
				player.votedBy.push(voterName);
			}
			totalVotes = totalVotes + player.votes;
		});
		
		//Total amount of players voting
		totalVoting = gameState.phase == GamePhases.WOLVES_AWAKE ? roles.wolves : _.where(gameState.players, {state: RoleStates.ALIVE}).length;

		if(totalVoting === totalVotes) {
			// all players voted
			var mostVotesCount = _.max(gameState.players, function(player){ return player.votes; }).votes;
			console.log("mostvo", mostVotesCount);
			var mostVotedPlayers = _.where(gameState.players, {votes: mostVotesCount});
			console.log("mostvoPL", mostVotedPlayers);

			
			if (mostVotedPlayers.length === 1) {
				// wolves killed
				gameState.phase = gameState.phase == GamePhases.WOLVES_AWAKE ? GamePhases.WOLVES_KILLED : GamePhases.VILLAGE_KILLED;
				_.each(gameState.players, function(player) {
					if(player.name === mostVotedPlayers[0].name) {
						player.state = RoleStates.KILLED;
						gameState.last_kill = player.name
					}
				});
			} else {
				// a tie
				resetVotes();
				gameState.phase = gameState.phase == GamePhases.WOLVES_AWAKE ? GamePhases.WOLVES_AWAKE : GamePhases.VILLAGE_VOTE;
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