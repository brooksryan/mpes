//save all ticks from page

//save all ticks from page

//get all user ticks returns an object with userURL, exportURL, 

function getPredictionForCurrentClimb(){

	console.log("made it to the prediction function")

	//get all user ticks returns an object with userURL, exportURL, 
	return getAllUserTickUrls()

	.then(function(result){

		//then we download all of the CSVs for those users ticks transorm
		//the ticks to JSON objects and add them to the array of user data 
		//as "userTicks"	
		$("#downloadAllUserTicks").text("Almost There");
		return userDataFromCSVPromise(result)})

	.then(function(userURLS){

		$("#downloadAllUserTicks").text("Tidying Up");

		return makeBigArray(userURLS)})

	.then(function(newBigCSV){

		$("#downloadAllUserTicks").text("Done!");

		downloadThisRouteCSV(newBigCSV);

		console.log("check out all the urls I just got: ", newBigCSV)
	
	})

};

$("div.pt-main-content > div.col-xs-12").append('<button id="downloadAllUserTicks" class = "button"> Download CSV of All Users Ticks </button>')


$("#downloadAllUserTicks").click(function(){

	$(this).text("loading");

	console.log("Ive been clicked!");
	
	getPredictionForCurrentClimb();

})

	// 	//pull the csvs for each of those users

	// ).then(

	// 	//manipulate the csvs to create a single userid, routeid, rating csv

	// ).then (


	// )