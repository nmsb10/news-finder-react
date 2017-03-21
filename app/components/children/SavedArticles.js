// Include React
var React = require("react");
var DeleteArticleForm = require('./DeleteArticleForm');

// Creating the Results component
var Saved = React.createClass({
	handleDeleteArticle: function(article, code){
		this.props.deleteArticle(article, code);
	},
	render: function(){
		return (
			<div className="panel panel-primary">
				{/*Panel Heading for the retrieved articles box*/}
				<div className="panel-heading">
					<h3 className="panel-title"><strong><i className="fa fa-table"></i> Saved Articles</strong></h3>
				</div>
				{/*This main panel will hold each of the resulting articles*/}
				<div className="panel-body" id="wellSection">
					{this.props.savedArticles.map(function(found, i) {
						return (
							<div key = {i} className = 'panel panel-success'>
								<div className = 'panel-heading'>
									<h3>{found.title}</h3>
								</div>
								<div className = 'panel-body'>
									<h5>article published on: {found.pubDate}</h5>
									<h5>this specific article saved on: {found.date}</h5>
									<a href={found.url} target='_blank'>{found.url}</a>
									<br/>
									<br/>
									<DeleteArticleForm id={found._id} deleteIt = {this.handleDeleteArticle}/>
								</div>
							</div>
						);
					{/*VERY IMPORTANT: INCLUDE `THIS` HERE SO YOU CAN PASS FUNCTIONS FROM THIS RESULTS.JS COMPONENT TO ELEMENTS WITHIN THIS MAPPING OF THE articlesFound ARRAY*/}
					},this)}
				</div>
			</div>
		);
	}
});

// Export the component Saved for use in Main.js
module.exports = Saved;