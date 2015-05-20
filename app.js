var express = require('express'),
	app  = express(),
	server = require('http').Server(app),
	Race = require('./data/race'),
	Player = require('./data/player'),
	Kart = require('./data/kart'),
	bodyParser = require('body-parser'),
	io = require('socket.io')(server);


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static( __dirname +'/public'));
app.use( function(req, res, next){
	req.io = io;
	next();
});


var the_race = new Race();


app.set('port', (process.env.PORT || 80));
server.listen(app.get('port'));

var router = express.Router();

router.get('/',function(req, res){
	res.sendFile(__dirname + '/views/index.html');
});

router.route("/race/start")
.get( function (req, res){
	the_race.start_race();
	console.log("Race Started");
	res.sendStatus(200);
});

router.route("/race/reset")
.get( function (req, res){
	the_race.reset_race();
	console.log("Race Resets");
	res.sendStatus(200);
});

router.route('/gamemode/sprint')
.get( function (req, res){
	res.sendFile(__dirname + '/views/sprint.html');
});

router.route('/gamemode/timetrial')
.get( function (req, res){
	res.sendFile(__dirname + '/views/timetrial.html');
});

router.route('/players')
.post(function(req, res){
	
	// create player
	var a_player = new Player();

	// add to race
	the_race.add_player(a_player);

	console.log("Adding a player");
	res.statusCode = 201;
	
	res.send(a_player._id);
})
.get(function(req, res){
	console.log("+");
	res.send({players:the_race._players});
});

router.route('/players/:player_id')

.get(function(req, res){
	var player_id = req.params.player_id;
	console.log('Request for player: ' + player_id);
	the_race.find_player(player_id,function(found_player){
		res.send("A fetched player " + found_player);
		console.log(found_player);
	});
})
.put(function(req, res){
	the_race.find_player(req.params.player_id, function(found_player){
		var new_name = req.body.name;
		found_player.change_name(new_name);
		res.send("Name of player changed to: " + new_name);
	});
});

router.route('/karts')
.post(function(req, res){
	var a_kart = new Kart();
	a_kart.set_mac(req.body.mac);
	the_race.add_kart(a_kart);
	req.io.sockets.emit('add-kart',{kart:a_kart});

	res.statusCode = 201;
	res.send("Adding kart with mac " + a_kart._bt_mac);
	console.log("Kart with mac: " + a_kart._bt_mac + "was added");
})
.get(function(req, res)
{	res.send({karts:the_race._karts});
});


router.route('/karts/:kart_id')
.get(function(req, res){
	var kart_mac = req.params.kart_id;
	console.log(" get: "+kart_mac);
	the_race.find_kart(kart_mac,function(found_kart){
		console.log(found_kart._current_power);
		res.send(found_kart._current_power);
	});

})
.put(function(req, res){
 var kart_mac = req.params.kart_id;
 console.log(kart_mac + " finds a tag ");
 the_race.activate_power(kart_mac, function(kart){
 req.io.sockets.emit('tag-found',{karts:the_race._karts});
 res.sendStatus(200);
 });
});

app.use('/kartsi', router);
