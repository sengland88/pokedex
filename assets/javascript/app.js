// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyBttDw_iZJJGaw0fmFvFUw-NaiG627H_dI",
databaseURL: "https://pokedex-4f772.firebaseio.com",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.database()

let thePokemon = ""
let theWeather = ""

$("#submitBtn").on("click", function(event) {

    event.preventDefault()    
    
    getPokemon()
    // geoFindMe()
    getLocation()


})


function getLocation() {

    navigator.geolocation.getCurrentPosition(function(position){
        
        if (navigator.geolocation) {
            let latitude  = position.coords.latitude;
            let longitude = position.coords.longitude;
            getWeather(latitude, longitude)

        } // else if (!navigator.geolocation) {
        //     let latitude  = "30.4085477"
        //     let longitude = "-86.8754809"
        //     getWeather(latitude, longitude)
        // }
    })

}

function getWeather(lat , lon) {
    
    // let theCity = userInput //captures the city variable  
    
    let theKey = "0e1a9770bdf84bbcb4d232a7900a26e1" //stores the weather.io api key
    // console.log(`${theCity} is the City`) //console.logs the city to make sure that it is working

    let weatherURL = "https://api.weatherbit.io/v2.0/current?key=" + theKey + "&lat=" + lat + "&lon=" + lon

    // AJAX request to retrieve data from API
    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function(response) {
        // console.log(response.data)

        let weatherResults = response.data

        console.log(weatherResults) //console.log the whole results
        console.log(weatherResults[0].weather.code) //console.log the current weather's weather.io code

        let theWeather = Number(weatherResults[0].weather.code)

        theWeatherCode(theWeather)
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
    

}

