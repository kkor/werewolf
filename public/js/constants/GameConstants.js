var keyMirror = require('react/lib/keyMirror');

// Define constants
module.exports = {

  ActionTypes: keyMirror({
    NEXT_PHASE: null,
	UPDATE_PLAYERS: null
  }),

  GamePhases: keyMirror({
    LOBBY: null,
	  NIGHT: null,
	  WOLVES_AWAKE: null,
    WOLVES_KILLED: null,
    WOLVES_TIE: null,
	  SEER_AWAKE: null,
    SEER_ANSWER: null,
	  DAY: null,
    VILLAGE_VOTE: null,
    VILLAGE_KILLED: null,
    VILLAGE_TIE: null
  }),

  GameRoles: keyMirror({
    WOLF: null,
    VILLAGER: null,
    SEER: null
  }),

  RoleStates: keyMirror({
    ALIVE: null,
    DEAD: null,
    KILLED: null
  })

};
