var socket = io.connect();
var code = "";

exports.socket = socket;

exports.getCode = function() { return code; }

exports.setCode = function(newCode) { code = newCode; }