// Include React
var React = require("react");

// Creating the Form component
var Form = React.createClass({
	//render the Form panel for search parameters
	render: function(){
		return (
			<div className="panel panel-primary">
				<div className="panel-heading">
					<h3 className="panel-title"><strong><i className="fa  fa-list-alt"></i>Search Parameters</strong></h3>
				</div>
				<div className="panel-body">
					<form role="form">
						{/*input for capturing the search term*/}
						<div className="form-group">
							<label for="search">Search Term:</label>
							<input type="text" className="form-control" id="searchTerm"/>
						</div>

						{/*capture the number of records that the user wants to retrieve*/}
						{/*
						<div className="form-group">
							<label for="pwd">Number of Records to Retrieve:</label>
							<select className="form-control" id="numRecordsSelect">
								<option value=1>1</option>
								{/*Setting the option for 5 as default using parameter "selected"
								<option value=5 selected>5</option>
								<option value=10>10</option>
							</select>			  
						</div>
						*/}

						{/*input for capturing the parameter Start Year*/}
						<div className="form-group">
							<label for="startYear">Start Year (Optional):</label>
							<input type="text" className="form-control" id="startYear"/>
						</div>

						{/*input for capturing the parameter End Year*/}
						<div className="form-group">
							<label for="endYear">End Year (Optional):</label>
							<input type="text" className="form-control" id="endYear"/>
						</div>

						{/*input for capturing the parameter End Year*/}
						<button type="submit" className="btn btn-default" id="runSearch"><i class="fa fa-search"></i> Search</button>
  						{/*<button type="button" class="btn btn-default" id="clearAll"><i class="fa fa-trash"></i> Clear Results</button>*/}

					</form>
				</div>
			</div>
			);
	}

});

// Export the component Form for use in Main.js
module.exports = Form;