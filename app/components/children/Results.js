// Include React
var React = require("react");

// Creating the Results component
var Results = React.createClass({
	getInitialState: function(){
		return{
			articlesReceived: this.props.articlesFound
		};
	},
	//if the component changes (ie if new articles are found)
	componentDidUpdate: function(){
		console.log('Results.js: ', this.state.articlesReceived);
	},
	render: function(){
		return (
			<div className="panel panel-primary">
				{/*Panel Heading for the retrieved articles box*/}
				<div className="panel-heading">
					<h3 className="panel-title"><strong><i className="fa fa-table"></i> Top Articles</strong></h3>
				</div>
				{/*This main panel will hold each of the resulting articles*/}
				<div className="panel-body" id="wellSection">
					{this.props.articlesFound.map(function(search, i) {
						return (
							<p key={i}>{search._id} - {search.lead_paragraph}</p>
						);
					})}
				</div>
			</div>
		);
	}
});

// Export the component Results for use in Main.js
module.exports = Results;