//get all urls for user ticks from a page
console.log("I loaded the save all ticks thing")

var userData = function(user){

	this.userURL = user;

	this.exportURL = user + "/tick-export";

	this.calculateUserID = function(userURL){

		console.log(userURL)
			
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

		console.log("I started the traverse");

		$('h3:contains("Star Ratings ") ~ table > tbody > tr > td > a').each(function(index){

			var thisUserData = 	new userData(this.href);

			console.log(thisUserData.JSONstrigifiedData)

			arrayOfLinks.push(thisUserData.userID);

		});

		resolve(arrayOfLinks);

	});
}


function getRouteStatsOrchestration(){

	getAllUserTickUrls()

	.then(function(array) {
	
		console.log(array)

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
