require( 'ion-sound' );

ion.sound({
  sounds: [
    {
  	  name: 'everyone-sleep'
    }
  ],
  volume: 0.5,
  path: 'sounds/',
  preload: true
});

function playSound(soundName, isHost) {
	if (isHost) {
		console.log("SOOOOOOOOUND");
		ion.sound.play(soundName);
	}
}

module.exports = {
	playSound,
};
