var Race = function(){
	this._players = [];
	this._karts = [];
}


Race.prototype.add_kart = function(kart) {
	this._karts.push(kart);
};

Race.prototype.add_player = function(player){
	this._players.push(player);
};

module.exports = Race;