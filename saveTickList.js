
var thisUserTickExportUrl = window.location.href+"/tick-export"

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