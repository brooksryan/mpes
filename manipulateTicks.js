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

function transformTicksForNeuralNet(tickObject){

		this.validation = is_url(tickObject.URL);

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
			
			
				return this.id() + ", " + this.rating();

			} else { 

				return "Error";

			}

		};

	}

function transformTicks(){

	$.get("chrome-extension://mmobjpoobjddbmdcaedncgnaiamcanok/ticks.csv", function(data) {
		console.log("data");
		
		var transformedCSVofTicks = csvJSON(data)

		transformedCSVofTicks.forEach(function(element, index){
			
			var newTick = new transformTicksForNeuralNet(element);


			if (newTick === "Error"){

				console.log(element, index);

			} else {

				newTickArray.push(newTick.tickToCsv());

			}
			
		})

		console.log(newTickArray);

	});
}

thisData = csvJSON("file:///C:/Users/bryan/Downloads/contentSettings/ticks.csv");

console.log(thisData);