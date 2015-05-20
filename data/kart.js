var Kart = function(){
	this._bt_mac = "";
	this._available = true;
	this._current_power = "stop";
	this.score = 0;
};

Kart.prototype.set_mac = function(mac) {
	this._bt_mac = mac;
};

Kart.prototype.set_power = function(power, cb) {
	this._current_power = power;
	console.log(this._bt_mac + " " + power);
	var five_seconds = setTimeout(this.reset_power.bind(this),5000);
};

Kart.prototype.set_available = function(is_available) {
	this._available = is_available;
};

Kart.prototype.reset_power = function(){
	console.log(this._bt_mac + " resets");
	this._current_power = "none";
};

module.exports = Kart;