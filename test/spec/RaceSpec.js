var Race = require('../../data/race');

describe("A race",function(){
	it("has players",function(){
		var race = new Race();
		expect(race._players).toBeTruthy();
	})
	it("has karts", function(){
		var race = new Race();
		expect(race._karts).toBeTruthy();
	})
	it("adds a player",function(){
		var race = new Race();
		race.add_player({});
		expect(race._players.length).toBe(1);
	})
	it("adds a kart", function(){
		var race = new Race();
		race.add_kart({});
		expect(race._karts.length).toBe(1);
	})
});