// Include React
var React = require("react");

// Creating the Results component
var Results = React.createClass({
	getInitialState: function(){
		return{
			articlesReceived: this.props.articlesFound,
			saveCode: ''
		};
	},
	//if the component changes (ie if new articles are found)
	componentDidUpdate: function(){
		//console.log('Results.js: ', this.state.articlesReceived);
	},
	handleChangeSaveCode: function(event){
		this.setState({saveCode: event.target.value});
	},
	handleSubmitSave: function(event){
		event.preventDefault();
		console.log('save this article');
		// if(this.state.searchTerm === ''){
		// 	this.setState({searchPlaceholder: 'please first enter a topic to search'});
		// }else{
		// 	this.props.sendSearchTerms(this.state.searchTerm, this.state.numberOfRecords, this.state.startYear, this.state.endYear);
		// 	this.setState({
		// 		searchTerm: '',
		// 		numberOfRecords: 5,
		// 		startYear: '',
		// 		endYear: '',
		// 		searchPlaceholder: 'enter another topic to search!'
		// 	});
		// }
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
									<h5>{search.byline.original}</h5>
									<h5>{search.lead_paragraph}</h5>{/*or snippet?*/}
									<h5>{search.pub_date} | article id: {search._id}</h5>
									<a href={search.web_url}>{search.web_url}</a>
									<br/>
									<form role = 'form' className = 'clearfix'>
										<div className="form-group pull-left">
											<input
												type="text" 
												className="form-control" 
											/>
											<label>enter your save password above</label>
										</div>
										<button type = 'submit' className="btn btn-default pull-right">Save Article</button>
									</form>
								</div>
								{/* run this component's handleSubmit function when the form is submitted per the submit button*/}
								{/*
								<form role="form" onSubmit = {this.handleSubmitSave}>
									{/*input for capturing the search term
									<div className="form-group">
										<label>save password:</label>
										<input
											type="text" 
											className="form-control" 
											value = {this.state.saveCode} 
											onChange = {this.handleChangeSaveCode}
										/>
									</div>
									{/*input for capturing the parameter saveordelete code
									<button type="submit" className="btn btn-default">Save Article</button>
								</form>
								*/}
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