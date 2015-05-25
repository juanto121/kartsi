describe("A race",function(){
	it("has players",function(){
		var race = new Race();
		expect(race._players).toBeTruthy();
	});
	it("has karts", function(){
		var race = new Race();
		expect(race._karts).toBeTruthy();
	});
	it("adds a player",function(){
		var race = new Race();
		race.add_player({});
		expect(race._players.length).toBe(1);
	});
	it("adds a kart", function(){
		var race = new Race();
		race.add_kart({});
		expect(race._karts.length).toBe(1);
	});
	it("finds a player with id", function(){
		var race = new Race();
		var player = {
						_name:"BOT",
						_id:"EJM5kbtb"
					};

		race.add_player(player);

		race.find_player(player._id,function(found_player){
			expect(found_player._id).toEqual("EJM5kbtb");
			expect(found_player).toEqual(player);
		});
	});
});