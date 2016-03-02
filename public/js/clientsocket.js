var socket = io.connect();
var code = "";

console.log("Clientsocket code:", code);

exports.socket = socket;

// TODO not used
exports.getCode = function() { return code; };

// TODO not used
exports.setCode = function(newCode) {
	console.log("Set clientsocket code to:", newCode);
	code = newCode;
};

exports.sendAction = function(data) {
	console.log("Clientsocket emit pressed:button", data);

	socket.emit('pressed:button', data);
};

exports.createRoom = function(data) {
	console.log("Clientsocket emit create:room", data);

	socket.emit('create:room', data);
};

exports.saveSettings = function(data) {
	console.log("Clientsocket emit settings:save", data);

	socket.emit('settings:save', data);
};