var shortid = require('shortid');

var Player = function(){
	this._name = "BOT";
	this._id = shortid.generate();
};

Player.prototype.change_name = function(name) {
	this._name = name;
};

module.exports = Player;