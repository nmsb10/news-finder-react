// Include React
//https://facebook.github.io/react/
var React = require("react");

// Here we include all of the sub-components
var Search = require("./children/Search.js");
var Results = require("./children/Results.js");
var Saved = require("./children/SavedArticles.js");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers.js");

//note that styles values need to be a string
const jumbotronStyle = {
	backgroundColor: 'rgb(50, 15, 50)',
	color: 'rgb(255, 255, 255)'
};

//Create the Main component
var Main = React.createClass({
	getInitialState: function(){
		return {
			searchTerm: '',
			numberOfRecords:5,
			startYear: 2017,
			endYear:2017,
			searchResults: ''
		};
	},
	//if this Main component changes (ie if a search is entered)
	componentDidUpdate: function(){
		helpers.runQuery(this.state.searchTerm, this.state.numberOfRecords, this.state.startYear, this.state.endYear).then(function(data){
			console.log('article results:', data);
		}.bind(this));
	},
	//function so Search child may give the parent the search term
	setSearchTerms: function(searchterm, records, start, end){
		this.setState({
			searchTerm: searchterm,
			numberOfRecords: records,
			startYear: start,
			endYear: end
		});
		console.log('search criteria sent to Main.js:', searchterm, records, start, end);
	},
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
						<Search sendSearchTerms = {this.setSearchTerms}/>
					</div>
				</div>
				{/* results component */}
				
				<div className = 'row'>
					<div className = 'col-sm-12'>
						<Results articlesFound = {this.state.searchResults}/>
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