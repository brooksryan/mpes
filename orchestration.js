//save all ticks from page

//save all ticks from page

//get all user ticks returns an object with userURL, exportURL, 

function getPredictionForCurrentClimb(){

	console.log("made it to the prediction function")

	//get all user ticks returns an object with userURL, exportURL, 
	return getAllUserTickUrls()
	
	//then we download all of the CSVs for those users ticks transorm
	//the ticks to JSON objects and add them to the array of user data 
	//as "userTicks"
	.then(function(result){return userDataFromCSVPromise(result)})


	.then(function(userURLS){

		console.log("check out all the urls I just got: ", userURLS[10])

	})

};


getPredictionForCurrentClimb()

	// 	//pull the csvs for each of those users

	// ).then(

	// 	//manipulate the csvs to create a single userid, routeid, rating csv

	// ).then (


	// )