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


//takes a split url, returns if it's a user or a route
//also returns the ID
function pageObject (url){

	this.splitUrl = url.split("/");

	this.pageUrl = url;

	this.pageType = function(){

			if (this.splitUrl[3] === "route"){
	
				return "route"
	
			} if (this.splitUrl[3] === "user"){
	
				return "user"
	
			} else {
	
				return "other"
	
			};
		};

	this.id = this.splitUrl[4];

}

//CREATES AN OBJECT FOR THE CURRENT LOGGED IN USER
thisUsersMpInfo = new pageObject(thisLoggedInUserUrl);


//CREATES AN OBJECT FOR THE CURRENT PAGE THE USER 
//IS ON
thisMpPageInfo = new pageObject(window.location.href);

console.log("the current page is a: ", thisMpPageInfo.pageType())


// Returns binary if the user is logged and on their own page
// in or not
function isThisTheLoggedInUser () {
	return thisUsersMpInfo.pageUrl === window.location.href;
}

//Returns binary if the user is logged in or not

var loggedInUserStatus = isThisTheLoggedInUser();

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


//returns object with page type and id for current
//page 
function returnIdForMountainProjectPage(url) {

	var url = whatPageAmIOn();

	console.log("this is the url I got back", url)

	var thisPageObject = new pageObject(url);

	console.log(thisPageObject)

	return thisPageObject
}

var displayAchievementsStatus = false

addSyncDataButton()