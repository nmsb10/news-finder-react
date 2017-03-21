// Include React
var React = require("react");
var SaveArticleForm = require('./SaveArticleForm');

// Creating the Results component
var Results = React.createClass({
	handleSaveArticle: function(article, code){
		this.props.saveArticle(article, code);
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
							<div key = {i} className = 'panel panel-info'>
								<div className = 'panel-heading'>
									<h3>{search.headline.main}</h3>
								</div>
								<div className = 'panel-body'>
									{search.byline !== null && <h5>{search.byline.original}</h5>}
									<h5>{search.lead_paragraph}</h5>{/*or snippet?*/}
									<h5>{search.pub_date} | article id: {search._id}</h5>
									<a href={search.web_url} target='_blank'>{search.web_url}</a>
									<br/>
									<br/>
									<SaveArticleForm id={i} saveIt = {this.handleSaveArticle}/>
									{/*
									<div key={i}> <button type = "button" onClick={this.newStuff.bind(this, i)} className="btn btn-default pull-right">HELLO!</button> </div>
									<SaveArticleForm id={i} saveIt = {(event) => this.handleSaveArticle(event)}/>
									*/}
								</div>
							</div>
						);
					//VERY IMPORTANT: INCLUDE `THIS` HERE SO YOU CAN PASS FUNCTIONS FROM THIS RESULTS.JS COMPONENT TO ELEMENTS WITHIN THIS MAPPING OF THE articlesFound ARRAY
					},this)}
				</div>
			</div>
		);
	}
});

// Export the component Results for use in Main.js
module.exports = Results;