//creates achievements div
$("div#user-info div.row:first").append('<div class = "col-xs-12 text-xs-center" id = "achievements"> <h3> Achievements </h3> </div>');

//function for appending achievements in the div
function appendAchievementToProfile (achievementText){
	$("#achievements").append("<p>",achievementText,"</p>")
}

//gets achievements from chrome local

var displayLoggedInUsersAchievements = function() {

	chrome.storage.local.get('achievements',function(results){
		// console.log(results.["1"])
		console.log("Display achievements got the old achievement list ", results.achievements)

		var storedAchievements = results.achievements

		//if the achievement is completed appends the achievemnt under the achievements section
		storedAchievements.forEach(function(element){
			if(element.completed === true) {
				appendAchievementToProfile(element.name)
			}
		})
	})

}

function displayCurrentPageUsersAchievements() {

	getUserData(function(data){
		
		getAchievements (achievementList, data, function(newList){
			console.log(newList);
		})

	})

	console.log("add achievements to this page");

}


function displayTheRightAchievements (){
	
	console.log(loggedInUserStatus);

	if (loggedInUserStatus === true) {

		displayLoggedInUsersAchievements()

	} else {

		displayCurrentPageUsersAchievements()

	}
}


displayTheRightAchievements();