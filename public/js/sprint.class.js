var Sprint = (function(){

	function Sprint(){
		this.initVars();
	}

	var sprint = Sprint.prototype;

	sprint.initVars = function () {
		this.karts = [];

		/*
		TODO:
		Should get karts in race first, 
		so all users have the same info.
		*/

		//Seconds of race
		this.raceTime = 10;
		this.timerRace = this.raceTime;
		//Seconds till race start
		this.readyTime = 10;
		this.timerToStart = this.readyTime;

		this.kartTemplate = $("#kartTemplate");
		this.kartContainer = $("#raceRank");

		this.counterStart = $("#timeToStart");
		this.counterRace = $("#timeOfRace");
		this.readyTimeBar = $("#readyTime");
		this.raceTimeBar = $("#raceTime");

		this.winnerDisplay = $("#winnerDisplay");
		this.winnerTemplate = $("#winnerTemplate");

		this.raceTick = null;

		this.raceStarted = false;
	};

	//Refactoring needed! avoid IF nesting hell.
	sprint.tick = function(){
		this.timerToStart--;
		if(this.timerToStart<0){
			
			if(!this.raceStarted){
				$.ajax({
					url : "http://localhost/kartsi/race/start",
					type: 'get',
					success: this.setRaceStart.bind(this)
				});
			}

			this.timerRace--;

			if(this.timerRace<0){
				
				this.showWinner();
			}else{
				this.counterRace.html(this.timerRace);
				animateTimebar(this.raceTimeBar, this.raceTime, this.timerRace);
			}

		}else{
			animateTimebar(this.readyTimeBar, this.readyTime, this.timerToStart);
			this.counterStart.html(this.timerToStart);
		}

	};

	sprint.setRaceStart = function(){
		this.raceStarted = true;
	};

	function animateTimebar(barElement, originalValue, currentValue){

		var barNewWidth = ( originalValue - currentValue) * 100 / originalValue;
		var percentage = barNewWidth+"%";
		barElement.animate({
			width:percentage
		},500);

	}

	sprint.showWinner = function() {
		window.clearInterval(this.raceTick);
		var winner = this.karts[this.karts.length-1];

		var winnerData = {
			kartName: winner._bt_mac,
			kartScore: winner.score
		};

		var winnerKart = Mustache.to_html(this.winnerTemplate.html(), winnerData);
		this.winnerDisplay.append(winnerKart);
		this.kartContainer.empty();
		$(".rankHeading").empty();

		this.winnerDisplay.toggleClass("hidden");
		this.resetSprint();
		setTimeout(function(){
			location.reload();
		},15000);

	};

	sprint.resetSprint = function(){
		if(this.raceStarted){
			$.ajax({
				url : "http://localhost/kartsi/race/reset",
				type: 'get',
				success: function(result){
					console.log("Race resets in 10 Secs");
				}
			});
		}
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
		if(this.raceTick == null)
			this.raceTick = setInterval(this.tick.bind(this) , 1000);
	};

	sprint.updateGameRank = function (state) {
		

		this.karts = state.karts;
		this.karts.sort(function(a, b) {
			return a.score - b.score;
		});

		console.log(this.karts);

		var len = this.karts.length;
		var oLen = len;
		while(len--){
			var kart = this.karts[len];

			kart.kartPos = -(len-oLen);
			kart.kartMac = kart._bt_mac;
			kart.kartName = kart._bt_mac;
			kart.kartStatus = kart._current_power;
			kart.kartScore = kart.score;

			var id = "#"+kart.kartMac;
			var kartBox = $(id);
			
			var template = Mustache.to_html(this.kartTemplate.html(),kart);
			kartBox.html(template);
			
			kartBox = $(kartBox[0]);
			kartBox.removeClass("winner");
			
			if(len==1){
				kartBox.toggleClass("winner");
				
			}
		}
	};
	return Sprint;
})();

window.onload = function(){
	sprint = new Sprint();
};