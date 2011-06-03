
// Bring in includes
var mongoq  = require("mongoq");
var express = require("express");
var log     = require('logging').from(__filename);


// Setup MongoDB Connection
var tastydb = mongoq("mongodb://localhost/tasty");
var users = tastydb.collection("users");
var items = tastydb.collection("items");


// Create and configure express server
var app = express.createServer();
app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
});

app.configure('development', function(){
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  var oneYear = 31557600000;
  app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
  app.use(express.errorHandler());
});


// Application Routes

app.get('/', function(req,res){
    items.findItems({}, function(err,docs){
        log(docs);
        res.render('index', {items:docs, fetchMap:true});
    });
});

app.get('/add', function(req,res){
    res.render('add');
});

app.get('/api/get/:lat/:lon/:rad?', function(req,res){
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
app.listen(3000);

