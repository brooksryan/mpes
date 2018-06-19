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

function transformTicksForNeuralNet(tickObject){

	newTickObject = {

		validation: is_url(tickObject.URL),

		id: function(){
			
			var splitURL = tickObject.URL.split("/");

			if (splitURL[4] >= 100000000 && splitURL[4] <= 999999999){			
			
				return splitURL[4];
			
			} else {

				return "Error"
			}

		}, 

		rating: function(){
			
			if (tickObject['"Your Stars"'] === "-1"){
			
				return tickObject['"Avg Stars"']/4
			
			} else {

				return tickObject['"Your Stars"']/4;

			}
		},

		tickToCsv: function (){

			if (this.validation === true){
			
			
				return this.id() + ", " + this.rating();

			} else { 

				return "Error";

			}

		}

	}

	return newTickObject.tickToCsv();

}

$.get("chrome-extension://mmobjpoobjddbmdcaedncgnaiamcanok/ticks.csv", function(data) {
	console.log("data");
	var thisNewData = csvJSON(data)

	thisNewData.forEach(function(element, index){
		
		var newTick = transformTicksForNeuralNet(element);

		if (newTick === "Error"){

			console.log(element, index);

		} else {

			newTickArray.push(newTick);

		}
		
	})

	console.log(newTickArray);

});

thisData = csvJSON("file:///C:/Users/bryan/Downloads/contentSettings/ticks.csv");

console.log(thisData);