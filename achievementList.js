function newRoute (newDate, newName) {
  this.date = newDate;
  this.name = newName;
}


var achievementList = [
  {
    name: "Climb Outside",
    completed: false,
    conditions: function (data) {
      for (const prop in data) {
        if (data[prop].Style == "Lead"){
          console.log ("this climb completed the achievement " + this.name)
          this.completed = true;
          this.achievementCompletionData = newRoute(data[prop].Date, data[prop].Name)
          return this.completed
        }
        else console.log(data[prop].Date + " " + prop)
      }
    },
    achievementCompletionData: newRoute(), 
    description: "",
    points: "",
    image: "" 
  },
  {
    name: "Climb El Cap",
    completed: false,
    conditions: function (data) {
      for (const prop in data) {
        if (data[prop].Route == "El Cap"){
          console.log ("this climb completed the achievement " + this.name)
          this.completed = true;
          return this.completed
        }
        else console.log(data[prop].Date + " " + prop)
      }
    },
    description: "",
    date: "", 
    points: "",
    image: "" 
  },
  {
    name: "Climb 5.6",
    completed: false,
    conditions: function (data) {
      for (const prop in data) {
        if (data[prop].Rating == "5.6"){
          console.log ("this climb completed the achievement " + this.name)
          this.completed = true;
          return this.completed
        }
        else console.log(data[prop].Date + " " + prop)
      }
    },
    description: "",
    date: "", 
    points: "",
    image: "" 
  }
]