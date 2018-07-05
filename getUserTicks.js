var getUserData = function (callback) {

	var thisUserTickExportUrl = window.location.href+"/tick-export";

    console.log(window.location.href+"/tick-export");

    $.get(thisUserTickExportUrl,function(data){

		var thisData = csvJSON(data)

		console.log(thisData["1"]);

		callback(thisData);

  });

}

