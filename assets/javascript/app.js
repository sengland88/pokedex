//this is dummy text for the on.click function
// $("#submit").on("click", function(){

//     userInput = $("#test").val().trim().toLowerCase()
//     console.log(userInput)
//     getWeather()

// })


function getWeather() {
    
    let theCity = userInput //captures the city variable    
    let theKey = "0e1a9770bdf84bbcb4d232a7900a26e1" //stores the weather.io api key
    console.log(`${theCity} is the City`) //console.logs the city to make sure that it is working

    let queryURL = "https://api.weatherbit.io/v2.0/current?key=" + theKey + "&city=" + theCity //concatenates all of the information

    // AJAX request to retrieve data from API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // console.log(response.data)

        let results = response.data

        console.log(results) //console.log the whole results
        console.log(results[0].weather.code) //console.log the current weather's weather.io code
    })

    //weather.io weather codes - to be used for conditional statements (comparing current weather against the type)
    // sunny = 800
    // partly cloudy = 801 and 802
    // cloudy = 804
    // raining = 200 - 502
    // snow = 600 - 623
    // fog = 741 and 751   
    // windy = 803

}