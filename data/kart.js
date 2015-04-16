var Kart = function(){
	this._bt_mac = "";
	this._available = true;
	this._current_power = null;
}

Kart.prototype.set_mac = function(mac) {
	this._bt_mac = mac;
};

Kart.prototype.set_power = function(power) {
	this._current_power = power;
};

Kart.prototype.set_available = function(is_available) {
	this._available = is_available;
};

module.exports = Kart;