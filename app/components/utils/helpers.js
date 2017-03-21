// Include the axios package for performing HTTP requests (promise based alternative to request)
//https://github.com/mzabriskie/axios
var axios = require("axios");

var helper = {
	//function to query the nyt api
	runQuery: function(searchTerm, numberOfRecords, startYear, endYear){
		// This variable will be pre-programmed with our authentication key (the one we received when we registered)
		//var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
		var key = '2341b8bd89254c4f8b3a1ff1e097d8ea';
		// Based on the queryTerm we will create a queryURL 
		var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + key + "&q=";
		//var queryURL = queryURLBase + searchTerm.trim().split(' ').join('_');
		var queryURL = queryURLBase + searchTerm.trim();
		// function twoDigits(n){
		// 	return n > 9 ? "" + n: "0" + n;
		// }
		if(parseInt(startYear)){
			queryURL += "&begin_date=" + startYear + "0101";
		}
		if(parseInt(endYear)){
			var d = new Date();
			queryURL += "&end_date=" + endYear + "0101";
		}
		//console.log('queryURL: ', queryURL);
		return axios.get(queryURL).then(function(response){
			var foundArticles = [];
			if(response.data.response.docs.length < numberOfRecords){
				for(var i = 0; i<response.data.response.docs.length; i++){
					//console.log(response.data.response.docs[i]);
					foundArticles.push(response.data.response.docs[i]);
				}
			}else{
				for(var j = 0; j<numberOfRecords; j++){
					//console.log(response.data.response.docs[j]);
					foundArticles.push(response.data.response.docs[j]);
				}
			}
			return foundArticles;
		});
	},
	//function to save an article
	postArticle: function(article, saveCode){
		return axios.post('/api', {article: article, code: saveCode });
	},
	//function to get saved articles
	getArticles: function(){
		return axios.get('/api');
	},
	deleteArticle: function(article, deleteCode){
		//return axios.delete('/api', {article: article});
		return axios.post('/delete/article', {article: article});
	}
};

// Export helper for use in Main.js
module.exports = helper;