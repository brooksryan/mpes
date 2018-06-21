//validates urls

function is_url(str)

{
  regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        
        if (regexp.test(str))
        {
          return true;
        }
        else
        {
          return false;
        }
}



var thisStuff = String(chrome.runtime.getURL("ticks.csv"));

console.log(thisStuff);

var newTickArray = []

//takes a tick object from MP and transforms it into a csv -readable
//formt with the user, tick ID, and that user's rating.

function transformTicksForNeuralNet(tickObject, thisUserID){

		this.validation = is_url(tickObject.URL);

		this.userID = thisUserID;

		this.id = function(){
			
			var splitURL = tickObject.URL.split("/");

			if (splitURL[4] >= 100000000 && splitURL[4] <= 999999999){			
			
				return splitURL[4];
			
			} else {

				return "Error"
			}

		}; 

		this.rating = function(){
			
			if (tickObject['"Your Stars"'] === "-1"){
			
				return tickObject['"Avg Stars"']/4
			
			} else {

				return tickObject['"Your Stars"']/4;

			}
		};

		//returns a comma separated text string of the user, 
		//the climb id, and the user's rating	
		this.tickToCsv = function (){

			if (this.validation === true){
			
			
				return [this.userID, this.id(), this.rating()];

			} else { 

				return "Error";

			}

		};

	}

function transformTicks (userTicks, arrayForTicks, thisUserId){
		
		var errorCounter;

		var transformedCSVofTicks = userTicks;

		console.log(transformedCSVofTicks)	

		transformedCSVofTicks.forEach(function(element, index){
			
			var newTick = new transformTicksForNeuralNet(element, thisUserId);


			if (newTick.tickToCsv() == "Error"){

				errorCounter ++

				console.log(element, index);

			} else {

				arrayForTicks.push(newTick.tickToCsv());

			}
			
		})

		console.log(newTickArray);
}

//merge all of the users tick list into a single exportable
//array userID, ClimbID, Rating

function makeBigArray (bigArrayOfUserData) {

	console.log("Started the big array creation", bigArrayOfUserData)

	var bigTickArray = []

	//new Promise (function(resolve, reject){

		bigArrayOfUserData.forEach(function(element){

			console.log(element['userID'])
			var thisUserIdToAdd = element['userID']

			console.log(element['userTicks'])
			var thisUsersTicks = element['userTicks']

			console.log("starting the foreach function")
			
			transformTicks(thisUsersTicks, bigTickArray, thisUserIdToAdd);

			console.log("I started the iteration", element)

		});

	console.log("this is done");

	console.log(bigTickArray)

	return bigTickArray
	
	//Promise.resolve(bigTickArray)

	//});
}

var downloadThisRouteCSV = function(arrayToBeDownloaded) {

	var csvContent = "";
			
	arrayToBeDownloaded.forEach(function(rowArray){
	   let row = rowArray.join(",");
	   csvContent += row + "\r\n";
	}); 

	var encodedUri = new Blob([csvContent], {type: 'text/csv' });

	var csvUrl = URL.createObjectURL(encodedUri);

	var link = document.createElement("a");
	link.setAttribute("href", csvUrl);
	link.setAttribute("download", "my_data.csv");
	link.innerHTML= "Click Here to download";
	document.body.appendChild(link); // Required for FF

	link.click();


}





thisData = csvJSON("file:///C:/Users/bryan/Downloads/contentSettings/ticks.csv");

console.log(thisData);

function processAllUserItemsForMachineLearning (arrayOfUsersAndTicks) {


}