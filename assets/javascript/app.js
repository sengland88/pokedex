getLocation()

var theWeather

$("#submitBtn").on("click", function(event) {

    event.preventDefault()

    let userInput = $("#search").val().trim()

    console.log(userInput)
    
    getPokemon(userInput)    

})

function getLocation() {

    navigator.geolocation.getCurrentPosition(function(position){
        
        if (navigator.geolocation) {
            let latitude  = position.coords.latitude;
            let longitude = position.coords.longitude;
            getWeather(latitude, longitude)
            $("#location").html("location found")
        }
    })
}

function getWeather(lat , lon) {
    
    let theKey = "0e1a9770bdf84bbcb4d232a7900a26e1"
    let weatherURL = "https://api.weatherbit.io/v2.0/current?key=" + theKey + "&lat=" + lat + "&lon=" + lon

    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function(response) {

        let weatherResults = response.data
        let theWeather = Number(weatherResults[0].weather.code)
        console.log(theWeather)
        return theWeather
        
    })

}

// function theWeatherCode(code) {

    
//     if (code === 803 || code === 804) {
//         console.log("windy")
//         var code = "windy"
//     } 

//     if (code === 801 || code === 802) {
//         console.log("partly cloudy")
//         var code = "partly cloudy"

//     }

//     if (code === 800) {
//         console.log("sunny")
//         var code = "sunny" 

//     }

//     if (code === 741 || code === 751) {
//         console.log("fog")
//         var code = "fog"

//     }

//     if (code >= 600 && code <= 623) {
//         console.log("snowy")
//         var code = "snowy"

//     }

//     if (code >= 200 && code <= 502) {
//         console.log("rainy")
//         var code = "rainy"

//     }

//     let theCode = code
    
//     console.log("_____________________")
//     console.log(theCode)
//     console.log("_____________________")
    

// }

