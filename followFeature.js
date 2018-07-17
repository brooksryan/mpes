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
			
			$("div.info > div.mt-1").eq(0).after('<div class="mt-1"> <a href = "' + followURL + '"class="btn btn-sm btn-primary" id = "follow-button"> Follow </a></div>')

			$("#follow-button").css({

				"background-color" : "green", 
				"border-color" : "green",
				"width": "76.563px"
			
			});

			resolve("Done")

		} else {

			var unFollowURL = "https://mpes-brooksryan.c9users.io/users/deleteConnection/" + thisUsersMpInfo.id + "/" + thisMpPageInfo.id +"/"

			$("div.info > div.mt-1").eq(0).after('<div class="mt-1"> <a href="' + unFollowURL + '"class="btn btn-sm btn-primary" id = "follow-button"> Unfollow </a></div>')

			$("#follow-button").css({

				"background-color" : "green", 
				"border-color" : "green",
				"width": "76.563px"
			
			});

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


// -------- SECTION FOR IS FOR FOLLOWING FEED --------- //

function thisUsersFeed (baseUrl, userId){

	this.userId = userId

	this.currentPageNumber = 1 

	this.feedUrl = baseUrl + "users/tickFeed/" + this.userId + "/" + this.currentPageNumber

	this.userFeed = function(feedUrl){

		var that = this

		return new Promise(function(resolve, reject){

			$.get(feedUrl,function(data){

				thisUsersFollowingTicks = (JSON.parse(data));

				console.log(thisUsersFollowingTicks)

				this.whereToPrepend

				thisUsersFollowingTicks.forEach(function(line){

					that.eachTickFormatting(line)

				})

				resolve(data);

		  	})
		  	
		  	.fail(function() {
				
				reject(data);
				
			})

		})


	}

	this.whereToPrepend = $("div#homepage-climb-bottom .col-xs-12")
		.first()
		.prepend(
			
			`
			<div id="feedId" class="row"> 
				<div class="col-xs-12"> 
					<div class="title-with-border-bottom mb-2 mt-1">
						<h2> Your Friends Have Been Busy 
						</h2>
					</div>
					<div class="table-responsive max-height max-height-md-none max-height-xs-300""
						<div class="col-xs-12">
							<table table table-striped route-table hidden-xs-down> 
								<tbody id="followerTickTable">
									<tr class="route-row">
										<td>Date</td>
										<td>Route</td>
										<td>User</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			`
		
		)

	this.eachTickFormatting = function(thisTickRow){

		console.log("I'm at the append part")

		var thisTableSelector = $("#followerTickTable")

		var thisDate = thisTickRow.fields.date

		console.log(thisDate)
		
		thisTableSelector.append("<tr class='route-row'><td>" + thisTickRow.fields.date + "</td><td><a href='" + thisTickRow.fields.route_url +  "'>" + thisTickRow.fields.route_name + "</a></td><td>"+ thisTickRow.fields.creator + "</td></tr>")

	}

}

