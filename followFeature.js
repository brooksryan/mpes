// when I am on another user's page, this function 
// takes my mpId and checks to see if I am following
// the user whose page I'm on 

function amIFollowingThisUser (loggedInUserId, userToBeFollowedId) {

	queryURL = "https://mpes-brooksryan.c9users.io/users/status/" + loggedInUserId + "/" + userToBeFollowedId +"/"

	return new Promise(function(resolve, reject){

		$.get(queryURL,function(data){

			console.log(data);

			resolve(data);

	  	})
	  	
	  	.fail(function() {
			
			reject(data);
			
		})

	})

}

function addFollowStatusAndInteraction (followStatus) {

	return new Promise(function(resolve, reject){

		if (followStatus === "False"){

			var followURL = "https://mpes-brooksryan.c9users.io/users/createNewConnection/" + thisUsersMpInfo.id + "/" + thisMpPageInfo.id +"/"
			
			$("div.info > div.mt-1").after('<class="mt-1"> <a href = "' + followURL + '"class="btn btn-sm btn-primary"> Follow </a></div>')

			resolve("Done")

		} else {

			console.log("add the unfollow button here")

			resolve("unfollow button added")

		}
	})

}

function followFeatureOrchestration (){

	console.log("I'm in the orchestration and following feature")

	return amIFollowingThisUser(thisUsersMpInfo.id, thisMpPageInfo.id)

	.then(function(response){

		return addFollowStatusAndInteraction(response);


	})

}
