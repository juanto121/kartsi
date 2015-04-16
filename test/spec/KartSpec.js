var Kart = require('../../data/kart');

describe("The kart class",function(){
	it("sets a MAC",function(){
		var a_kart = new Kart();
		a_kart.set_mac("34:45:10:AB:10:AB");
		expect(a_kart._bt_mac).toBe("34:45:10:AB:10:AB");
	})
	it("sets a power up",function(){
		var a_kart = new Kart();
		a_kart.set_power("stop");
		expect(a_kart._current_power).toBe("stop");
	})
	it("starts available",function(){
		var a_kart = new Kart();
		expect(a_kart._available).toBe(true);
	})
	it("becomes unavailable",function(){
		var a_kart = new Kart();
		a_kart.set_available(false);
		expect(a_kart._available).toBe(false);
	})
	
});