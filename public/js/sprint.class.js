var Sprint = (function(){

	function Sprint(){
		this.initVars();
	};

	var sprint = Sprint.prototype;

	sprint.initVars = function () {
		this.karts = [];

		/*
		TODO:
		Should get karts in race first, 
		so all users have the same info.
		*/

		this.kartTemplate = $("#kartTemplate");
		this.kartContainer = $("#raceRank");
	};

	sprint.addKart = function (data) {
		var kart = data.kart;
		this.karts.push(kart);
		console.log(kart);
		var newKart = {
			kartMac:kart._bt_mac,
			kartName:kart._bt_mac,
			kartStatus: kart._current_power,
			kartScore: kart.score
		};

		var kartBox = Mustache.to_html(this.kartTemplate.html(), newKart);
		this.kartContainer.append(kartBox);
	};

	sprint.updateGameRank = function (state) {
		console.log(state.karts);
		this.karts = state.karts;
		this.karts.sort(function(a, b) {
			return a.score - b.score;
		});
		var len = this.karts.length;
		while(len--){
			var kart = this.karts[len];

			kart.kartMac = kart._bt_mac;
			kart.kartName = kart._bt_mac;
			kart.kartStatus = kart._current_power;
			kart.kartScore = kart.score;

			var id = "#"+kart.kartMac;
			var kartBox = $(id);
			
			var template = Mustache.to_html(this.kartTemplate.html(),kart);
			kartBox[0].innerHTML = template;

		}
	};
	return Sprint;
})();

window.onload = function(){
	sprint = new Sprint;
};