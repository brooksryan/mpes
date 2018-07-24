/* WELCOME TO THE ORCHESTRATION LAYER. THIS FILE DETERMINES  */ 
/* WHAT TO DO BASED ON THE PAGE YOU ARE ON                   */

/* EVERY THING HERE SHOULD HAVE A PAGE DETERMINATION OR      */
/* DEPENDENT FUNCTION, THEN A FUNCTION THAT FIRES WHEN THAT  */
/* PAGE CRITERIA IS MET									     */

/* EG "AM I ON A TICK PAGE?" -> TICK PAGE FUNCTION 		     */

//Determines what kind of page we're on
var thisUrlIsTheCurrentPage = whatPageAmIOn()

var thisPageDetails = returnIdForMountainProjectPage(thisUrlIsTheCurrentPage);

var thisBaseUrl = "https://mpes-brooksryan.c9users.io/"


//STUFF TO DO IF I'M ON MY OWN PAGE
if (isThisTheLoggedInUser() === true ) {

}

// STUFF TO DO IF YOU'RE ON A ROUTE PAGE
else if (thisPageDetails.pageType() === "route") {

	var thisRoutesId = Number(thisPageDetails.id)

	classicRouteOrchestration(thisRoutesId)

}

// STUFF TO DO IF YOU'RE ON ANOTHER USER'S PAGE
else if (thisPageDetails.pageType() === "user"){

	followFeatureOrchestration ()

}


else {

	thisUserFeedOrchestration(mpesBaseUrl,thisUsersMpInfo.id)

}



