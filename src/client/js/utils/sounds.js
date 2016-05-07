require( 'ion-sound' );

ion.sound({
  sounds: [
    {
  	  name: '1-everyone-sleep'
    }, {
  	  name: '2-wolves-wake-up'
    }, {
  	  name: '3-wolves-sleep'
    }, {
  	  name: '4-seer-wake-up'
    }, {
  	  name: '5-seer-sleep'
    }, {
  	  name: '6-everyone-wake-up'
    }
  ],
  volume: 0.5,
  path: 'sounds/',
  preload: true
});

function playSound(soundName, isHost) {
	if (isHost) {
		ion.sound.play(soundName);
	}
}

module.exports = {
	playSound: playSound,
};
