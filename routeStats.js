function getThisRouteStats(){

    return new Promise(function(resolve, reject) {
        
        $.ajax({

        type: 'GET',
        url: mpesBaseUrl + 'routestats/getStats/',
        data: {"url": thisUrlIsTheCurrentPage}

        }).done(function(data){

            resolve(data)

        }).fail(function(data){

            reject(data)

        })

    })

}

function docChangesForRouteStats(){

    $("div.pt-main-content:first div:nth-child(3n) .row:first").append(`
            <div class = "col-xs-12"> 
                <div class="mt-2 max-height max-height-md-800 max-height-xs-600" style="max-height: none;">
                    <h2 class="mt-2">
                        Advanced Info
                    </h2>
                    <div class="fr-view">
                        Additional data to help you better understand this route.
                    </div>
                </div>

                <!-- Average Ticks By Grade Before Send -->

                <h3 class="mt-2">                    
                    Most Ticked At this Grade Before Send
                </h3>

                <div class="fr-view">
                    These are the routes at this grade that the most people ticked before ticking this route.
                </div>

                <div id = "mostTickedRoutes"></div>

                <!-- Average Ticks By Grade Before Send -->

                <h3 class="mt-2">                    
                    Average Number Of Ticks By Grade Before First Send
                </h3>
                <div class="fr-view">
                    Here's the average number of climbs at each grade users tick <i>before</i> ticking this climb.
                </div>
                <canvas id="myChart" max-width="400px" max-height="400px"> 
            </div>`);

}


function makeNewChart(routeStatResults){

    console.log(routeStatResults)

    // I hate the name of this variable as much as you do
    var storageArray = []

    var chartLables = [];

    var chartValues = [];

    function compareNumbers(a, b) {

        console.log(a.sortingGrade,b.sortingGrade)

        splita = a.sortingGrade.split(/([a-d])/)

        splitb = b.sortingGrade.split(/([a-d])/)

        if (parseInt(splita[0]) > parseInt(splitb[0])){

            return 1
        
        }

        if (parseInt(splita[0]) < parseInt(splitb[0])){

            return -1
        
        } 

        if (splita[0] === splitb[0]){

            console.log(a > b)

            console.log(a < b)

            console.log(a,b)
            

            if (a.sortingGrade < b.sortingGrade){

                return -1
        
            }

            if (a.sortingGrade > b.sortingGrade){

                return +1
        
            } 


        }

        else return 0

    }

    for (var key in routeStatResults) {
        // check if the property/key is defined in the object itself, not in parent
        if (routeStatResults.hasOwnProperty(key) && routeStatResults[key] > 0) {

            chartCountObject = {}

            var splitKey = key.split(".")

            chartCountObject.sortingGrade = splitKey[1]

            chartCountObject.originalGrade = key

            chartCountObject.value = routeStatResults[key]
            
            storageArray.push(chartCountObject)

        }
    }

    var sortedArray = storageArray.sort(compareNumbers)

    sortedArray.forEach(function(item){

        chartLables.push(item.originalGrade)

        chartValues.push(item.value)

    })

    var ctx = document.getElementById("myChart").getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartLables,
            datasets: [{
                label: 'ticks',
                data: chartValues,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });

}

function appendMostTickedElements(tickArray){
    var routeName = tickArray[0]
    var numberOfTicks = tickArray[1]

    var element = `
        
        <div class="fr-view">
            <b> ` +  routeName + `: </b> ` + numberOfTicks + ` ticks
        </div>

    `;

    $("#mostTickedRoutes").append(element)



}


// Takes array of tuples where tuple[0] is route name and [1]
// is the count of ticks
function addMostTickedAtThisGrade(mostTickedRoutesArray){

    mostTickedRoutesArray.forEach(function(item,index){


        appendMostTickedElements(item)

    })

}


function routeStatsOrchestration(){

    docChangesForRouteStats()

    return getThisRouteStats()

        .then(function(data){

            console.log(data)

            addMostTickedAtThisGrade(data.topFiveAtGradeBeforeTick)

            makeNewChart(data.averageNumberOfTicksPerGradeBeforeSend)

        })


}