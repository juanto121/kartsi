var express = require('express'),
	app  = express(),
	server = require('http').Server(app),
	Race = require('./data/race'),
	Player = require('./data/player'),
	Kart = require('./data/kart'),
	bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));

var the_race = new Race();

app.use(express.static( __dirname +'/public'));


var router = express.Router();

router.get('/',function(req, res){
	res.send('Connected to Kartsi');
});

router.route('/players')
.post(function(req, res){
	console.log("Adding a player");
	// create player
	var a_player = new Player();

	// add to race
	the_race.add_player(a_player);

	res.send(a_player._id);
})
.get(function(req, res){
	console.log("Getting all players");

})
;

router.route('/players/:player_id')
.get(function(req, res){
	console.log('Request for player: ' + req.params.player_id);
})
.put(function(req, res){
	
	var player = the_race.find_player(req.params.player_id);
	var new_name = "";
	player.change_name(new_name);


});



app.use('/kartsi', router);

app.listen(3000);