//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyBttDw_iZJJGaw0fmFvFUw-NaiG627H_dI",
//     databaseURL: "https://pokedex-4f772.firebaseio.com",
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);

//   let database = firebase.initializeApp()

//this is dummy text for the on.click function
// $("#submit").on("click", function(){

//     userInput = $("#test").val().trim().toLowerCase()
//     console.log(userInput)
//     getWeather()

// })


theWeatherCode(200)


function getWeather() {
    
    // let theCity = userInput //captures the city variable   
    let  theCity = "orlando"
    let theKey = "0e1a9770bdf84bbcb4d232a7900a26e1" //stores the weather.io api key
    console.log(`${theCity} is the City`) //console.logs the city to make sure that it is working

    let weatherURL = "https://api.weatherbit.io/v2.0/current?key=" + theKey + "&city=" + theCity //concatenates all of the information

    // AJAX request to retrieve data from API
    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function(response) {
        // console.log(response.data)

        let weatherResults = response.data

        console.log(weatherResults) //console.log the whole results
        console.log(weatherResults[0].weather.code) //console.log the current weather's weather.io code
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

function theWeatherCode(code) {

    if (code === 741 || code === 751) {
        console.log("fog")
        return
    }

    if (code === 803) {
        console.log("windy")
        return
    }

    if (code === 801 || code === 802) {
        console.log("partly cloudy")
        return
    }

    if (code === 800) {
        console.log("sunny")
        return
    }

    if (code >= 623 || code <= 600) {
        console.log("snowy")
        return
    }

    if (code >= 502 || code <= 200) {
        console.log("rainy")
        return
    } 












}