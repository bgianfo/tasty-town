

// Bring in includes
var mongoq  = require("mongoq");
var express = require("express");
var geoip   = require("geoip");
var log     = require('logging').from(__filename);


// Setup MongoDB Connection
var tastydb = mongoq("mongodb://localhost/tasty");
var users = tastydb.collection("users");
var items = tastydb.collection("items");

// Startup Maxmind database
var citydb = new geoip.City('GeoLiteCity.dat');


var PORT = 3000;

// Create and configure express server
var app = express.createServer();

app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.logger({ format: "\033[90m:method\033[0m \033[36m:url\033[0m \033[90m:status :response-timems -> :res[Content-Type]\033[0m" }));
    app.use(app.router);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
});

app.configure('development', function(){
    app.use(express['static'](__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  var oneYear = 31557600000;
  app.use(express['static'](__dirname + '/public', { maxAge: oneYear }));
  app.use(express.errorHandler());
});


// Application Routes

app.get('/', function(req,res){
    items.findItems({}, function(err,docs){
        res.render('index', {items:docs, fetchMap:true});
    });
});

app.get('/add', function(req,res){
    res.render('add');
});

app.get('/api/get/:lat/:lon/:rad?', function(req,res){
  console.log("test");
});

app.get("/api/location", function(req,res) {
    var ip = res.connection.remoteAddress;
    ip = (ip == "127.0.0.1") ? "71.181.230.149" : ip;

    citydb.lookup(ip, function (err, data) {
      if ( data !== null && data.latitude && data.longitude ) {
        res.send(data);
      } else {
        res.send({});
      }
    });
});

app.post('/api/add/item/:user/:title/:content/:lat/:lon', function(req,res){

    var item = {
        title: req.params.title,
        details: req.params.content,
        user: req.params.user,
        loc: [ req.params.lon, req.params.lat ]
    };

    items.insert( item, function(err, doc) {
        log( "Inserted:"  );
        log( doc );
    });
});

// Start the server
app.listen(PORT);
