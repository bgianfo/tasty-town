
// Bring in includes 
var mongoq  = require("mongoq");
var express = require("express");

// Setup MongoDB Connection
var tastydb = mongoq("mongodb://localhost/tasty");
var users = tastydb.collection("users");
var items = tastydb.collection("users");


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
        res.render('index', {items:docs});
    });
});


app.get('/api/get/:lat/:lon/:rad?', function(req,res){
});

app.post('/api/add/item/:user/:title/:content/:lat/:lon', function(req,res){

    var item = {
        title: req.params.title,
        details: req.params.content,
        user: req.params.user
    };

    items.insert( item, function(err, doc) {
        console.log( "Inserted:" + item );
    });
});

app.listen(3000);

