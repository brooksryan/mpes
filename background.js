chrome.runtime.onInstalled.addListener(function() {
   console.log("done");
   var achievements = backgroundAchievementList; 

   chrome.storage.local.set({'achievements': achievements}, function() {
      console.log('Value is set to ' + achievements);

      chrome.storage.local.get('achievements',function(results){
       // console.log(results.["1"])
       console.log(results.achievements)
      })
   });
});

chrome.runtime.onMessage.addListener(
  function(request,sender,sendResponse) {
    console.log(request);
    if (request.greeting == "hello")
      
      sendResponse({achievements: backgroundAchievementList});
    
    else {console.log("message")};

    return true
});

// function sendDetails(sendData) {
//     //Select tab
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         //Construct & send message
//         chrome.tabs.sendMessage(tabs[0].id, {
//             achievements: sendData
//         }, function(response) {
//             //On response alert the response
//             alert("The response from the content script: " + response.response);//You have to choose which part of the response you want to display ie. response.response
//         });
//     });
// }

