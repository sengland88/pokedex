getLocation()

var temp = "Shelby"
var temp2 = 


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
                     

            $.get( "https://maps.googleapis.com/maps/api/geocode/json?latlng="+ position.coords.latitude + "," + position.coords.longitude + "&key=AIzaSyBlUXLLW6bchhS3Niw7AIrlNyOyPJSYYX8", function(data) {
                    console.log(data)
                    console.log()
            $("#location").html(`Your location is ${data.results[4].formatted_address}`)
            })

            let theKey = "0e1a9770bdf84bbcb4d232a7900a26e1"
            let weatherURL = "https://api.weatherbit.io/v2.0/current?key=" + theKey + "&lat=" + latitude + "&lon=" + longitude

            $.ajax({
                url: weatherURL,
                method: "GET"
            }).then(function(response) {

                let weatherResults = response.data
                let theWeather = Number(weatherResults[0].weather.code)
                console.log(theWeather)
                let theCode = theWeatherCode(theWeather)
                $("#weather").html(`The weather in your area is current ${theCode}`)
            })
        }
    })
}


function theWeatherCode(code) {
    
    if (code === 803 || code === 804) {
        console.log("windy")
        var code = "windy"
    } 

    if (code === 801 || code === 802) {
        console.log("partly cloudy")
        var code = "partly cloudy"

    }

    if (code === 800) {
        console.log("sunny")
        var code = "sunny" 

    }

    if (code === 741 || code === 751) {
        console.log("fog")
        var code = "fog"

    }

    if (code >= 600 && code <= 623) {
        console.log("snowy")
        var code = "snowy"

    }

    if (code >= 200 && code <= 502) {
        console.log("rainy")
        var code = "rainy"

    }

    let theCode = code    
    
    console.log("_____________________")
    console.log(theCode)
    console.log("_____________________")

    return theCode
    

}

