var Player = require('../../data/player');

describe("A Player",function(){
	it("has a name",function(){
		var player = new Player();
		expect(player._name).toBeTruthy();
	})
	it("generates short id",function(){
		var player = new Player();
		var pattern = new RegExp("[a-zA-Z0-9\-\_]{7,14}");
		var res = pattern.exec(player._id);
		expect(player._id).toEqual(res[0]);
	})
	it("sets a new name",function(){
		var player = new Player();
		player.change_name("juan");
		expect(player._name).toBe("juan");
	})
})
