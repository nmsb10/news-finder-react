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

//route to send POST requests to be able to display the new articles
app.post('/api', function(request, response){
	Article.create({
		title: request.body.headline.main,
		date: request.body.pub_date,
		url: request.body.web_url
	});
});

// var ArticleSchema = new Schema({
// 	title: {
// 		type: String
// 	},
// 	date: {
// 		type: String
// 	},
// 	url: {
// 		type: String
// 	}
// });

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// -------------------------------------------------
// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
