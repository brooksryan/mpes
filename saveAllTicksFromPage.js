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

}