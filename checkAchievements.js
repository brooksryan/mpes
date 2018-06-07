
function getAchievements (achievements, userTicks,callback) {

  var completedAchievements = []

  achievements.forEach(function (element) {

    console.log(element);

    element.conditions(userTicks)

  });

  console.log("original achievements list: ", achievements);

  callback(achievements);

  console.log("done");

}

// Achievement -> check data -> finished