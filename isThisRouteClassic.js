/* 	ADDS AN ICON DEPENDING ON WHETHER OR NOT A ROUTE IS	*/
/*	ON A CLASSIC LIST LIKE 50 CLASSICS OR THE GOOD 		*/			
/*	THE GREAT THE AWESOME ETC. 							*/

function amIClassic (id) {

	return new Promise(function(resolve, reject){

		var thisRouteRequestURL = mpesBaseUrl+"prediction/allAuthorsAndLists/"+id;

		$.get(thisRouteRequestURL,function(data){

			var transformedData = JSON.parse(data)

			resolve(transformedData);

	  	})
	  	
	  	.fail(function() {
    		
    		reject("This route isn't on any special lists!")
  		
  		})

	})	

}

function appendClassicListNamesToRoute (arrayOfClassicLists) {

	$("div.col-md-9.float-md-right > h1").after('<div id="listDiv"> Appears In: </div>')

	arrayOfClassicLists.forEach(function(item){

		console.log(item.fields.RouteListName);

		$("div#listDiv").append('<p class="inline-block mr-2">'+ item.fields.RouteListName + '</p>')

	})

}


function classicRouteOrchestration (routeId) {

	return amIClassic(thisRoutesId)

	.then(function(data){

		appendClassicListNamesToRoute(data)

	})

	.catch(function(reason){

		console.log(reason);
	})

}