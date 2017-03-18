// Include React
var React = require("react");

// Creating the Form component
var Form = React.createClass({
	getInitialState: function(){
		return {
			// totalSearch:{
			// 	searchTerm: '',
			// 	numberOfRecords:5,
			// 	startYear: '',
			// 	endYear:''
			// },
			searchTerm:'',
			numberOfRecords:5,
			startYear: '',
			endYear:'',
			searchPlaceholder: ''
		};
	},
	handleInputChange: function(event){
		var newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);
	},
	handleChangeSearchTerm: function(event){
		this.setState({searchTerm: event.target.value});
	},
	handleSubmit: function(event){
		//first prevent the HTML from trying to submit a form
		//and refreshing the page if the user clicks the "enter" key
		//instead of clicking the submit button
		event.preventDefault();
		if(this.state.searchTerm === ''){
			this.setState({searchPlaceholder: 'please first enter a topic to search'});
		}else{
			//props of sendSearchTerms defined from parent Main.js (around line 48)
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
	//render the Form panel for search parameters
	render: function(){
		return (
			<div className="panel panel-primary">
				<div className="panel-heading">
					<h3 className="panel-title"><strong><i className="fa fa-list-alt"></i> Search Parameters</strong></h3>
				</div>
				<div className="panel-body">
					{/* run this component's handleSubmit function when the form is submitted per the submit button*/}
					<form role="form" onSubmit = {this.handleSubmit}>
						{/*input for capturing the search term*/}
						<div className="form-group">
							<label>Search Term:</label>
							<input
								type="text"
								className="form-control" 
								id="searchTerm"
								placeholder = {this.state.searchPlaceholder}
								value = {this.state.searchTerm}
								onChange = {(event) => this.handleInputChange(event)}
							/>
						</div>
						{/*capture the number of records that the user wants to retrieve*/}
						{/* onChange = {this.handleInputChange(event).bind(this)} */}
						<div className="form-group">
							<label>Number of Records to Retrieve:</label>
							<select
								value = {this.state.numberOfRecords}
								className="form-control"
								id="numberOfRecords"
								onChange = {(event) => this.handleInputChange(event)}
							>
								<option value='1'>1</option>
								{/*Setting the option for 5 as default using parameter "selected"*/}
								{/* cannot do this, must use JSX by setting the select html element value attribute to the appropriate state of this component*/}
								{/*<option value='5' selected>5</option>*/}
								<option value='5'>5</option>
								<option value='10'>10</option>
							</select>			  
						</div>

						{/*input for capturing the parameter Start Year*/}
						<div className="form-group">
							<label>Start Year (Optional):</label>
							<input
								type="text"
								className="form-control"
								id="startYear"
								value = {this.state.startYear}
								onChange = {(event) => this.handleInputChange(event)}							/>
						</div>

						{/*input for capturing the parameter End Year*/}
						<div className="form-group">
							{/*<label for="endYear">End Year (Optional):</label>*/}
							<label>End Year (Optional):</label>
							<input
								type="text"
								className="form-control"
								id="endYear"
								value = {this.state.endYear}
								onChange = {(event) => this.handleInputChange(event)}
							/>
						</div>

						{/*input for capturing the parameter End Year*/}
						<button type="submit" className="btn btn-default" id="runSearch"><i className="fa fa-search"></i> Search</button>
  						{/*<button type="button" class="btn btn-default" id="clearAll"><i class="fa fa-trash"></i> Clear Results</button>*/}

					</form>
				</div>
			</div>
			);
	}
});

// Export the component Form for use in Main.js
module.exports = Form;