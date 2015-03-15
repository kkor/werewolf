var socket = io.connect();
var code = "";

exports.socket = socket;

exports.getCode = function() { return code; };

exports.setCode = function(newCode) {
	code = newCode;
};

exports.sendAction = function(data) {
	socket.emit('pressed:button', data);
};

exports.createRoom = function(data) {
	socket.emit('create:room', data);
};