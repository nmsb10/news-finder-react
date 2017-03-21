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
			searchResults: [],
			savedArticles: []
		};
	},
	//the moment the page renders get the saved articles
	componentDidMount: function() {
		this.getSavedArticles();
	},
	//if this Main component changes (ie if a search is entered)
	componentDidUpdate: function(){
		console.log('main.js did update');
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
	getSavedArticles: function(){
		helpers.getArticles().then(function(response){
			if(response !== this.state.savedArticles){
				this.setState({
					savedArticles: response.data
				});
			}
		}.bind(this));
	},
	//function so Search child may give the parent the search term
	setSearchTerms: function(searchterm, records, start, end){
		helpers.runQuery(searchterm, records, start, end).then(function(data){
			this.setState({
				searchResults: data
			});
		}.bind(this));
	},
	saveArticle: function(article, code){
		var selected = this.state.searchResults[article];
		//now remove the saved article from searchResults array
		//nb: SHOULD NOT MUTATE STATE IE this.state.searchResults.splice(article,1);
		//instead, use the filter array method
		// var remove = parseInt(article);
		// var remainingSaved = this.state.searchResults.filter(function(itm, i){
		// 		return i !== remove;
		// });
		this.setState({
			searchResults: this.state.searchResults.filter(function(itm, i){
				return i !== parseInt(article);
			})
		});
		helpers.postArticle(selected, code);
		this.getSavedArticles();
	},
	deleteArticle: function(article, code){
		var selected = this.state.savedArticles[article];
		console.log('selected article id:',article);
		helpers.deleteArticle(article, code);
		this.getSavedArticles();
		//to delete article, usercode|| 55oo
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
						<Saved savedArticles = {this.state.savedArticles} deleteArticle = {this.deleteArticle}/>
					</div>
				</div>
			</div>
		);
	}
});

// Export the component Main for use in app.js
module.exports = Main;