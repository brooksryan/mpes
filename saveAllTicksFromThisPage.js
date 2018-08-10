//get all urls for user ticks from a page

var userData = function(user){

	this.userURL = user;

	this.exportURL = user + "/tick-export";

	this.calculateUserID = function(userURL){
			
		var splitURL = userURL.split("/");

		if (splitURL[4]){			
		
			return splitURL[4];
		
		} else {

			return "Error"
		}

	};

	this.calculateUserName = function(userURL){
			
		var splitURL = userURL.split("/");

			return splitURL[5];

	};

	this.userID = this.calculateUserID(user);

	this.userName = this.calculateUserName(user);

	this.thisUsersDataObject = {


		'userId': this.userID,

		'userName': this.userName,

		'userUrl': this.userURL,

		'userExportUrl': this.exportURL

	}

	this.JSONstrigifiedData = JSON.stringify(this.thisUsersDataObject)

};

var arrayOfLinks = []; 

function getAllUserTickUrls(whatToDoWithUrls){

	var arrayOfLinks = []; 

		return new Promise(function(resolve, reject) {

		$('h3:contains("Star Ratings ") ~ table > tbody > tr > td > a').each(function(index){

			var thisUserData = 	new userData(this.href);

			arrayOfLinks.push(thisUserData.userID);

		});

		resolve(arrayOfLinks);

	});
}


function getRouteStatsOrchestration(){

	getAllUserTickUrls()

	.then(function(array) {
	
		var getAllTicksUrl = mpesBaseUrl + 'ticksApi/' + 'routeTickProcessor'

		$.ajax({

			type: 'GET',
			url: getAllTicksUrl,
			data: {"tickArray[]": array}

		})
	})

	.catch(function(error){

		console.log(error)
	});


}
