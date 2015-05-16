var Race = function(){
	this._players = [];
	this._karts = [];
	this._time = 0;
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
	var kart;
	for (var i = 0; i < this._karts.length; i++) {
		if(this._karts[i]._bt_mac !== mac ){
			this._karts[i].set_power("stop");
		}else{
			kart = this._karts[i];
			this._karts[i].score += 50;
		}
	};
	cb(kart);
};

module.exports = Race;