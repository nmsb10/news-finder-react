// Include React
var React = require("react");

// Here we include all of the sub-components
var Search = require("./children/Search.js");
var Results = require("./children/Results.js");
var Saved = require("./children/SavedArticles.js");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

//note that styles values need to be a string
const jumbotronStyle = {
	backgroundColor: 'rgb(50, 15, 50)',
	color: 'rgb(255, 255, 255)'
};

//Create the Main component
var Main = React.createClass({
	render: function(){
		return (
			<div className = 'container'>
				{/* jumbotron header */}
				<div className = 'jumbotron' style = {jumbotronStyle}>
					<h1 className='text-center'><strong>new york times search<br/>with react.js</strong></h1>
				</div>
				{/* search form */}
				<div className = 'row'>
					<div className = 'col-sm-12'>
						<Search />
					</div>
				</div>
				{/* results form */}
				{/*
				<div className = 'row'>
					<div className = 'col-sm-12'>
						<Results />
					</div>
				</div>
				{/* saved articles
				<div className = 'row'>
					<div className = 'col-sm-12'>
						<Saved />
					</div>
				</div>
				*/}
			</div>
		);
	}

});

// Export the component Main for use in app.js
module.exports = Main;