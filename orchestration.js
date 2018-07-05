/* WELCOME TO THE ORCHESTRATION LAYER. THIS FILE DETERMINES  */ 
/* WHAT TO DO BASED ON THE PAGE YOU ARE ON                   */

/* EVERY THING HERE SHOULD HAVE A PAGE DETERMINATION OR      */
/* DEPENDENT FUNCTION, THEN A FUNCTION THAT FIRES WHEN THAT  */
/* PAGE CRITERIA IS MET									     */

/* EG "AM I ON A TICK PAGE?" -> TICK PAGE FUNCTION 		     */




// ------------ SECTION FOR TICK LIST DOWNLOAD ------------- //
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

//adds a button that enables you to download a CSV of all of the ticks
//from all of the users who have ticked a climb from on the  
//tick page for a climb
$("div.pt-main-content > div.col-xs-12").append('<button id="downloadAllUserTicks" class = "button"> Download CSV of All Users Ticks </button>')


$("#downloadAllUserTicks").click(function(){

	$(this).text("loading");

	console.log("Ive been clicked!");
	
	getPredictionForCurrentClimb();

})


// -------- SECTION FOR IS CLIMB ON A CLASSIC LIST --------- //

//Determines what kind of page we're on
var thisUrlIsTheCurrentPage = whatPageAmIOn()

var thisPageDetails = returnIdForMountainProjectPage(thisUrlIsTheCurrentPage);


if (thisPageDetails.pageType() === "route") {

	console.log("I'm a route!!");

	var thisRoutesId = Number(thisPageDetails.id)

	classicRouteOrchestration(thisRoutesId)

}

else {
	
	console.log("I'm not a route")

}





