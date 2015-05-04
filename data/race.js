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

Race.prototype.find_player = function(player_id, cb) {
	for (var i = 0; i < this._players.length; i++) {
		if(this._players[i]._id == player_id)
			cb(this._players[i]);
	};
};

Race.prototype.find_kart = function(mac, cb) {
	for (var i = 0; i < this._karts.length; i++) {
		if(this._karts[i]._bt_mac == mac){
			cb(this._karts[i]);
			break;
		}
	};
};

Race.prototype.activate_power = function(mac, cb) {
	for (var i = 0; i < this._karts.length; i++) {
		if(this._karts[i]._bt_mac !== mac ){
			this._karts[i].set_power("stop");
		}
	};
	cb();
};

module.exports = Race;