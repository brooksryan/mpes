//Create the button for syncing user data on the user info page

//Define User Url Variable
var thisLoggedInUserUrl;


//Gets user URL from dropdown
$("a.dropdown-item:contains('Your Page')").attr("href",function(i,val){
	thisLoggedInUserUrl = val;
});

function isThisTheLoggedInUser () {
	return thisLoggedInUserUrl === window.location.href;
}

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

addSyncDataButton()