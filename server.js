// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require Article Schema
var Article = require("./models/Article");

// Create Instance of Express
var app = express();
// Sets an initial port.
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------
// MongoDB Configuration configuration
//mongoose.connect("mongodb://localhost/nytreact");
mongoose.connect('mongodb://heroku_r1w606z5:8nvt5hgu5afgmg73da40o9g8hg@ds119750.mlab.com:19750/heroku_r1w606z5');

var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// This is the route we will send GET requests to retrieve any saved articles
// We will call this route the moment our page gets rendered
app.get("/api", function(request, response) {
	Article.find({}).exec(function(error, doc){
		if(error){
			console.log(error);
		}else{
			response.send(doc);
		}
	});
});

//route to send POST requests to save an article (received from helpers.js)
app.post('/api', function(request, response){
	Article.create({
		title: request.body.article.headline.main,
		pubDate: request.body.article.pub_date,
		url: request.body.article.web_url,
		code: request.body.code,
		date: Date.now()
	}, function(error){
		if(error){
			console.log(error);
		}else{
			console.log('saved the article!');
		}
	});
});

//route to send DELETE requests to delete an article (received from helpers.js)
//app.delete('/api', function(request, response){
app.post('/delete/article', function(request, response){
	Article.remove({_id:request.body.article}, function(error){
		if(error){
			console.log(error);
		}
	});
});

// -------------------------------------------------
// Listener
//to run locally; mongod; mongo; webpack -w; node server.js
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
