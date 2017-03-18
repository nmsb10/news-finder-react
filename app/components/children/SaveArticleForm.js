// Include React
var React = require("react");

// Creating the Results component
var Form = React.createClass({
	getInitialState: function(){
		return{
			saveCode: '',
			savePlaceholder: 'your password to save/delete'
		};
	},
	handleChangeSaveCode: function(event){
		this.setState({saveCode: event.target.value});
	},
	handleSaveArticle: function(event){
		event.preventDefault();
		console.log('save this article',event.target.articleToSave.id);
		console.log(this.state.saveCode);
		//this.props.saveArticle();
	},
	render: function(){
		return (
			<form role="form" className = 'clearfix' onSubmit = {this.handleSaveArticle}>
				<div className="form-group pull-left">
					<input
						type="text" 
						className="form-control" 
						placeholder = {this.state.savePlaceholder}
						value = {this.state.saveCode} 
						onChange = {this.handleChangeSaveCode}
					/>
					<input
						type = 'hidden'
						id= {this.props.id}
						name = 'articleToSave'
					/>
					<label>enter your save password above (what you enter to delete your article)</label>
				</div>
				<button type="submit" className="btn btn-default pull-right">Save Article</button>
			</form>
		);
	}
});

// Export the component Form for use in Results.js
module.exports = Form;