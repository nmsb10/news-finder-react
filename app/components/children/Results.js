// Include React
var React = require("react");
var SaveArticleForm = require('./SaveArticleForm');

// Creating the Results component
var Results = React.createClass({
	getInitialState: function(){
		return{
			saveCode: ''
		};
	},
	handleChangeSaveCode: function(event){
		this.setState({saveCode: event.target.value});
	},
	handleSubmitSave: function(event){
		event.preventDefault();
		console.log('save this article');
		if(this.state.searchTerm === ''){
			this.setState({searchPlaceholder: 'please first enter a topic to search'});
		}else{
			this.props.sendSearchTerms(this.state.searchTerm, this.state.numberOfRecords, this.state.startYear, this.state.endYear);
			this.setState({
				searchTerm: '',
				numberOfRecords: 5,
				startYear: '',
				endYear: '',
				searchPlaceholder: 'enter another topic to search!'
			});
		}
	},
	handleSaveArticle: function(event){
		event.preventDefault();
		console.log('save this article',event.target);
		console.log('save this article',event.target.id);
		console.log('save this article',event.target.articleToSave);
		this.props.saveArticle();
	},
	render: function(){
		return (
			<div className="panel panel-primary">
				{/*Panel Heading for the retrieved articles box*/}
				<div className="panel-heading">
					<h3 className="panel-title"><strong><i className="fa fa-table"></i> Top Articles Found</strong></h3>
				</div>
				{/*This main panel will hold each of the resulting articles*/}
				<div className="panel-body" id="wellSection">
					{this.props.articlesFound.map(function(search, i) {
						return (
							<div key = {i} className = 'panel panel-success'>
								<div className = 'panel-heading'>
									<h3>{search.headline.main}</h3>
								</div>
								<div className = 'panel-body'>
									{search.byline !== null && <h5>{search.byline.original}</h5>}
									<h5>{search.lead_paragraph}</h5>{/*or snippet?*/}
									<h5>{search.pub_date} | article id: {search._id}</h5>
									<a href={search.web_url}>{search.web_url}</a>
									<br/>
									<br/>
									<SaveArticleForm id={i}/>
									{/* run this component's handleSubmit function when the form is submitted per the submit button*/}
									{/*<form role="form" className = 'clearfix' onSubmit = {this.handleSaveArticle.bind(this)}>*/}
									{/*
									<form role="form" className = 'clearfix'>
										<div className="form-group pull-left">
											<label>save password:</label>
											<input
												type="text" 
												className="form-control" 
												value = {this.state.saveCode.bind(this)} 
												onChange = {this.handleChangeSaveCode.bind(this)}
											/>
											<input
												type = 'hidden'
												id={i}
												name = 'articleToSave'
											/>
											<label>enter your save password above</label>
										</div>
										<button type="submit" className="btn btn-default pull-right">Save Article</button>
									</form>
									*/}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
});

// Export the component Results for use in Main.js
module.exports = Results;