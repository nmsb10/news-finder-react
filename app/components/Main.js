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
			// startYear: 2017,
			// endYear:2017,
			searching:false,
			searchResults: [],
			savedArticles: []
		};
	},
	// The moment the page renders get the saved articles
	// componentDidMount: function() {
	// 	helpers.getHistory().then(function(response) {
	// 		console.log(response);
	// 		if (response !== this.state.history) {
	// 			console.log("History", response.data);
	// 			this.setState({ history: response.data });
	// 		}
	// 	}.bind(this));
	// },
	//if this Main component changes (ie if a search is entered)
	componentDidUpdate: function(){
		// if(!this.state.searching){
		// 	//VERY IMPORTANT! MUST ADDRESS THIS TO AVOID INFINITE LOOP!
		// 	this.setState({searching:true})
		// 	helpers.runQuery(this.state.searchTerm, this.state.numberOfRecords, this.state.startYear, this.state.endYear).then(function(data){
		// 		this.setState({
		// 			searchResults: data
		// 		});
		// 		console.log('search results:', this.state.searchResults);
		// 		//once the articles are received, post the found articles to Articles
		// 		//helpers.postArticles(data).then()
		// 	}.bind(this));
		// }
	},
	//function so Search child may give the parent the search term
	setSearchTerms: function(searchterm, records, start, end){
		// this.setState({
		// 	searchTerm: searchterm,
		// 	numberOfRecords: records,
		// 	startYear: start,
		// 	endYear: end,
		// 	searching: false
		// });
		helpers.runQuery(searchterm, records, start, end).then(function(data){
			console.log('data received in main.js (should be same as found articles array):', data)
			this.setState({
				searchResults: data
			});
			console.log('search results:', this.state.searchResults);
		}.bind(this));
		// this.setState({
		// 	searching: false
		// });
		// if(!this.state.searching){
		// 	//VERY IMPORTANT! MUST ADDRESS THIS TO AVOID INFINITE LOOP!
		// 	this.setState({
		// 		searching:true
		// 	});
		// 	helpers.runQuery(searchterm, records, start, end).then(function(data){
		// 		console.log('data received in main.js (should be same as found articles array):', data)
		// 		this.setState({
		// 			searchResults: data
		// 		});
		// 		console.log('search results:', this.state.searchResults);
		// 		//once the articles are received, post the found articles to Articles
		// 		//helpers.postArticles(data).then()
		// 	}.bind(this));
		// }
		//console.log('search criteria sent to Main.js:', searchterm, records, start, end);
	},
	saveArticle: function(){
		console.log('main.js: save this article');
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
						<Results articlesFound = {this.state.searchResults} saveArticle = {this.saveArticle}/>
					</div>
				</div>
				{/* saved articles component */}
				<div className = 'row'>
					<div className = 'col-sm-12'>
						<Saved savedArticles = {this.state.savedArticles} />
					</div>
				</div>
			</div>
		);
	}
});

// Export the component Main for use in app.js
module.exports = Main;