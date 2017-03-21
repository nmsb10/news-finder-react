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
		if(this.state.saveCode === ''){
			this.setState({
				savePlaceholder: 'please enter your delete password first'
			});
		}else{
			this.props.saveIt(event.target.articleToSave.dataset.articleid, this.state.saveCode);
			this.setState({
				saveCode: ''
			});
		}
	},
	render: function(){
		return (
			<form role="form" className = 'clearfix' onSubmit = {this.handleSaveArticle}>
				<div className="form-group pull-left">
					<input
						type="text" 
						id = 'saveEntry'
						className="form-control" 
						placeholder = {this.state.savePlaceholder}
						value = {this.state.saveCode} 
						onChange = {this.handleChangeSaveCode}
					/>
					<input
						type = 'hidden'
						data-articleid = {this.props.id}
						name = 'articleToSave'
					/>
					<label htmlFor='saveEntry'>enter your save password above (what you enter to delete your article)</label>
				</div>
				<button type="submit" className="btn btn-default pull-right">Save Article</button>
			</form>
		);
	}
});

// Export the component Form for use in Results.js
module.exports = Form;