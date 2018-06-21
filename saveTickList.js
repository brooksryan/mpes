
var thisUserTickExportUrl = window.location.href+"/tick-export"


function userDataFromCSVPromise (arrayOfUserDataObjects){

    //create a promise to return all of the data collected
    //from the csv export
    return new Promise(function(resolve, reject){

    var array = arrayOfUserDataObjects

    var getUserTickCSVFunction = function (element){

      //create a promise wrapper for each GET call
      //to a user's csv of ticks, returns the ticks
      //with the user object
      return new Promise(function(resolve, reject){
        
        $.get(element['exportURL'], function(data) {
        
            console.log( "getting this url: " + element['userURL']);

            var dataToJson = csvJSON(data)

            element['userTicks'] = dataToJson;

            resolve(element);
        
        })

      })

    }

    //we should use .map because it returns its results,
    //in this case the results are the data pushed to the
    //array from the function 
    var mappingFunction = array.map(getUserTickCSVFunction);

    //calls the promise.all for the mapping function
    //and returns the results
    var results = Promise.all(mappingFunction);

    //awaits all of the promieses in the 
    //mapping function and resolves the original promise
    //with the results of the mapping function
    results.then(function(data){resolve(data)})

  })

};


var syncUserData = function () {

    console.log(window.location.href+"/tick-export");

    $.get(thisUserTickExportUrl,function(data){

      var thisData = csvJSON(data)
      
      console.log(thisData["1"]);

      chrome.storage.local.set({'myTicks': thisData}, function() {
          console.log('New Ticks Stored');

          //get ticks from chrome storage to esnure continuity
          chrome.storage.local.get('myTicks',function(results){

            newTickData = results.myTicks

            chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
              console.log(response);

              //UNCOMMENT HERE TO KEEP WORKING ON REQUEST TO BACKGROUND TO GET ACHIEVEMENT LIST
              //LAST I CHECKED IT WASN'T PASSING THE FUNCTIONS TO THE CONTENT SCRIPT
              //achievementList = response.achievements; 

              getAchievements(achievementList,newTickData, function(completedAchievements){

                
                chrome.storage.local.set({'achievements': completedAchievements}, function() {
                  console.log('Value is set to ' + completedAchievements);

                  chrome.storage.local.get('achievements',function(results){
                   // console.log(results.["1"])
                   console.log("this is the new list ",results.achievements)
                  })
                });

                console.log(completedAchievements);

              });    
            });   
            // end of achievement query, need to nest this inside get achievement list callback
            console.log(results.myTicks["1"])
          })
        });
    })

}


function saveTheseTicksToChrome (theseTicks){

      chrome.storage.local.set({'myTicks': theseTicks}, function() {
          console.log('New Ticks Stored');

          //get ticks from chrome storage to esnure continuity
          chrome.storage.local.get('myTicks',function(results){

            newTickData = results.myTicks

            chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
              console.log(response);

              //UNCOMMENT HERE TO KEEP WORKING ON REQUEST TO BACKGROUND TO GET ACHIEVEMENT LIST
              //LAST I CHECKED IT WASN'T PASSING THE FUNCTIONS TO THE CONTENT SCRIPT
              //achievementList = response.achievements; 

              getAchievements(achievementList,newTickData, function(completedAchievements){

                
                chrome.storage.local.set({'achievements': completedAchievements}, function() {
                  console.log('Value is set to ' + completedAchievements);

                  chrome.storage.local.get('achievements',function(results){
                   // console.log(results.["1"])
                   console.log("this is the new list ",results.achievements)
                  })
                });

                console.log(completedAchievements);

              });    
            });   
            // end of achievement query, need to nest this inside get achievement list callback
            console.log(results.myTicks["1"])
          })
        });
    };