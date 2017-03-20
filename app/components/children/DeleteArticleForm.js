// Include React
var React = require("react");

// Creating the Results component
var DeleteForm = React.createClass({
	getInitialState: function(){
		return{
			deleteCode: '',
			deletePlaceholder: 'your password to delete'
		};
	},
	handleChangeDeleteCode: function(event){
		this.setState({deleteCode: event.target.value});
	},
	handleDeleteArticle: function(event){
		event.preventDefault();
		if(this.state.deleteCode === ''){
			this.setState({
				deletePlaceholder: 'please enter your delete password first'
			});
		}else{
			this.props.deleteIt(event.target.articleToDelete.dataset.articleid, this.state.deleteCode);
		}
	},
	render: function(){
		return (
			<form role="form" className = 'clearfix' onSubmit = {this.handleDeleteArticle}>
				<div className="form-group pull-left">
					<input
						type="text" 
						id = 'deleteEntry'
						className="form-control" 
						placeholder = {this.state.deletePlaceholder}
						value = {this.state.deleteCode} 
						onChange = {this.handleChangeDeleteCode}
					/>
					<input
						type = 'hidden'
						data-articleid = {this.props.id}
						name = 'articleToDelete'
					/>
					<label htmlFor='deleteEntry'>enter your delete password above</label>
				</div>
				<button type="submit" className="btn btn-danger pull-right">Delete Article</button>
			</form>
		);
	}
});

// Export the component DeleteForm for use in SavedArticles.js
module.exports = DeleteForm;