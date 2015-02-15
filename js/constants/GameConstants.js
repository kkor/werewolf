var keyMirror = require('react/lib/keyMirror');

// Define constants
module.exports = {

  ActionTypes: keyMirror({
    NEXT_PHASE: null
  }),

  GameStates: keyMirror({
	  NIGHT: null,
	  WOLVES: null,
	  SEER: null,
	  DAY: null
  })

};
