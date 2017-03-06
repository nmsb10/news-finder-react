// Include React
var React = require("react");

// Creating the Results component
var Saved = React.createClass({
	render: function(){
		return (
			<div className="panel panel-primary">
				{/*Panel Heading for the retrieved articles box*/}
				<div className="panel-heading">
					<h3 className="panel-title"><strong><i className="fa fa-table"></i> Saved Articles</strong></h3>
				</div>
				{/*This main panel will hold each of the resulting articles*/}
				<div className="panel-body" id="wellSection">
				</div>
			</div>
		);
	}
});

// Export the component Saved for use in Main.js
module.exports = Saved;