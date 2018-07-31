// when I am on another user's page, this function 
// takes my mpId and checks to see if I am following
// the user whose page I'm on 

function makeAFollowingActionOnThisUser(loggedInUserId, userToBeFollowedId, verb) {

    queryURL = "https://mpes-brooksryan.c9users.io/users/" + verb + "/" + loggedInUserId + "/" + userToBeFollowedId + "/";

    return new Promise(function(resolve, reject) {

        $.get(queryURL, function(data) {

        		console.log(data)

                resolve(data);

            })

            .fail(function(data) {

                reject(data);

            });

    });

}

function addFollowStatusAndInteraction(followStatus) {

    return new Promise(function(resolve, reject) {

        if (followStatus === "False") {

            var followURL = "https://mpes-brooksryan.c9users.io/users/createNewConnection/" + thisUsersMpInfo.id + "/" + thisMpPageInfo.id + "/";

            console.log(thisUsersMpInfo.id, thisMpPageInfo.id)

            $("div.info > div.mt-1").eq(0).after('<div class="mt-1"> <a a href="#" class="btn btn-sm btn-primary follow-button"> Follow </a></div>');

            $(".follow-button").css({

                "background-color": "green",
                "border-color": "green",
                "width": "95.563px",
                "color": "white !important"

            });

            $(".follow-button").click(function() {

                makeAFollowingActionOnThisUser(thisUsersMpInfo.id, thisMpPageInfo.id, "createNewConnection").then(function() {

                    $(".follow-button").remove();

                    followFeatureOrchestration();

                });

            });

            resolve("Done");

        } else {

            //var unFollowURL = "https://mpes-brooksryan.c9users.io/users/deleteConnection/" + thisUsersMpInfo.id + "/" + thisMpPageInfo.id +"/"

            $("div.info > div.mt-1").eq(0).after('<div class="mt-1"> <a href="#" class="btn btn-sm btn-primary follow-button"> Unfollow </a></div>');

            $(".follow-button").css({

                "background-color": "green",
                "border-color": "green",
                "width": "95.563px",
                "color": "white !important"

            });

            $(".follow-button").click(function() {

                makeAFollowingActionOnThisUser(thisUsersMpInfo.id, thisMpPageInfo.id, "deleteConnection").then(function() {

                    $(".follow-button").remove();

                    followFeatureOrchestration();

                });

            });

            resolve("unfollow button added");

        }
    });

}

function followFeatureOrchestration() {

    return makeAFollowingActionOnThisUser(thisUsersMpInfo.id, thisMpPageInfo.id, "status")

        .then(function(response) {

            return addFollowStatusAndInteraction(response);


        });

}


// -------- SECTION FOR IS FOR FOLLOWING FEED --------- //

function thisUsersFeed(baseUrl, userId, currentPageNumber) {

    this.userId = userId;

    this.currentPageNumber = currentPageNumber;

    this.hasMorePages;

    this.hasPreviousPages;

    this.nextPageNumber;

    this.previousPageNumber;

    this.feedUrl = baseUrl + "users/tickFeed/" + this.userId + "/" + this.currentPageNumber;

    this.userFeed = function(feedUrl) {

        var that = this;

        return new Promise(function(resolve, reject) {

            $.get(feedUrl, function(data) {

                    thisFeedData = data.feedItems;

                    thisFeedsTicks = (JSON.parse(thisFeedData));

                    thisFeedsTicks.forEach(function(line) {

                        that.eachTickFormatting(line);

                    });

                    // that.currentPageNumber = data.currentPageNumber;


                    // if (data.hasNextPage ===);
                    if (data.hasNextPage == true) {

                        that.hasMorePages = true

                        that.nextPageNumber = that.currentPageNumber + 1

                    } else {

                        that.hasMorePages = false

                    }

                    if (data.hasPreviousPage == true) {

                        that.hasPreviousPages = true

                        that.previousPageNumber = that.currentPageNumber - 1

                    } else {

                        that.hasPreviousPages = false

                    }

                    resolve(data);

                })

                .fail(function() {

                    reject(data);

                });

        });


    };

    this.prependFriendTicksTable = function() {

        $("div#homepage-climb-bottom .col-xs-12")
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
							<table class="table table-sm table-striped"> 
								<thead>	
									<tr id = "feedTableHeads" class="route-row">
										<th>Date</th>
										<th>Route</th>
										<th>User</th>
									</tr>
								</thead>	
								<tbody id="followerTickTable">
								</tbody>
							</table>
						</div>
					</div>
				<div class="col-xs-12">
					<nav id="navigationList" aria-label="Page navigation example">
  						<ul class="pagination">
  						</ul>
  					</nav>					
				</div>
			</div>
			`
            );

        $('#feedTableHeads>th').css({

            "color": "black",
            "background-color": "white",

        });
    };

    this.eachTickFormatting = function(thisTickRow) {

        var thisTableSelector = $("#followerTickTable");

        var thisDate = thisTickRow.fields.date;

        thisTableSelector.append("<tr class='route-row'><td>" + thisTickRow.fields.date + "</td><td><a href='" + thisTickRow.fields.route_url + "'>" + thisTickRow.fields.route_name + "</a></td><td>" + thisTickRow.fields.user_name_from_mp + "</td></tr>");

    };
    this.loadingImageHtmlToAppend = `<div id="loadingImage" class="col-xs-12 blink"> Loading... </div>`;

    this.navPreviousButtonHtmlToAppend =
        `		
	    <li id="previousItem" class="page-item my-nav-buttons">
	    	<a class="page-link">Previous</a>
	    </li>

    	`;

    this.navNextButtonHtmlToAppend =
        `
    	<li id="nextItem" class="page-item my-nav-buttons">
			<a class="page-link">Next</a>
		</li>
		`

    this.appendLoadingImage = function() {
        that = this;

        $('div#feedId').append(

            that.loadingImageHtmlToAppend

        );

        $("#loadingImage").css({

            "text-align": "center",

        });

        setInterval(function() {

            $(".blink").fadeOut(300).fadeIn(300);

        }, 500);

    };

    this.removeLoadingImage = function(stuffToRemove) {

        $('#loadingImage').remove();

    };

    this.addNavigationButtons = function() {

        if (this.hasPreviousPages) {

            $('nav#navigationList > ul').append(this.navPreviousButtonHtmlToAppend)
        };

        if (this.hasMorePages) {

            $('nav#navigationList > ul').append(this.navNextButtonHtmlToAppend)

        }

    };

}

function thisUserFeedOrchestration(baseUrl, mpUserId, pageNumber) {

    thisNewFeed = new thisUsersFeed(baseUrl, mpUserId, pageNumber);

    thisNewFeed.prependFriendTicksTable();

    thisNewFeed.appendLoadingImage();

    return thisNewFeed.userFeed(thisNewFeed.feedUrl)

        .then(function(response) {

            thisNewFeed.removeLoadingImage();

            thisNewFeed.addNavigationButtons()

        })

        .then(function() {

            $("#nextItem").click(function() {

                $(".my-nav-buttons").remove()

                $("#feedId").remove()

                thisUserFeedOrchestration(baseUrl, mpUserId, thisNewFeed.nextPageNumber)

            });

            $("#previousItem").click(function() {

                $(".my-nav-buttons").remove()

                $("#feedId").remove()

                thisUserFeedOrchestration(baseUrl, mpUserId, thisNewFeed.previousPageNumber)


            });

        });

}