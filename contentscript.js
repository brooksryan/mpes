/*

THIS PAGE SHOULD INCLUDE ALL HIGH LEVEL MANIPULATION OF THE WEBPAGE
I THINK

*/

//Create the button for syncing user data on the user info page

// BASE URL FOR SERVER SIDE
var mpesBaseUrl = "https://mpes-brooksryan.c9users.io/"


//Define User Url Variable
var thisLoggedInUserUrl;


//Gets user URL from dropdown
$("a.dropdown-item:contains('Your Page')").attr("href",function(i,val){
	thisLoggedInUserUrl = val;
});


//Returns binary if the user is logged in or not
function isThisTheLoggedInUser () {
	return thisLoggedInUserUrl === window.location.href;
}

//Returns binary if the user is logged in or not

var loggedInUserStatus =isThisTheLoggedInUser();

//checks if the page the user is on is the user's page
function addSyncDataButton(){

	console.log(thisLoggedInUserUrl);

	//appends the sync data button if the user is on their own page
	if (thisLoggedInUserUrl === window.location.href){
	
		$(".info:first").append('<button id="syncUserDataButton"> Sync Ticks For MPES </button>');
		
		//click triggers ther syncUserDataFunction		
		$("#syncUserDataButton").click(function(){
		  
		  // syncUserData();

		  getUserData(function(newData){

		  		saveTheseTicksToChrome()
		  })
		
		})
	}

	else console.log("this is not the user you are looking for");

}

//gets the route Id for a page

function whatPageAmIOn (){

	var thisPageURL = $(location).attr('href');

	console.log(thisPageURL)

	return thisPageURL

}

//stores the url for the current page
var thisUrlIsTheCurrentPage = whatPageAmIOn()



//takes a split url, returns if it's a user or a route
//also returns the ID
function pageObject (urlArray){

	this.pageType = function(){

			if (urlArray[3] === "route"){
	
				return "route"
	
			} if (urlArray[3] === "user"){
	
				return "user"
	
			} else {
	
				return "other"
	
			};
		}

	this.id = urlArray[4]

}

//returns object with page type and id for current
//page 
function returnIdForMountainProjectPage(url) {

	var url = whatPageAmIOn();

	console.log("this is the url I got back", url)

	var thisPageSplitURL = url.split("/");

	var thisPageObject = new pageObject(thisPageSplitURL);

	console.log(thisPageObject)

	return thisPageObject
}

addSyncDataButton()