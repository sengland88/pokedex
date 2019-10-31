//this is dummy text for the on.click function
// $("#submit").on("click", function(){

//     userInput = $("#test").val().trim().toLowerCase()
//     console.log(userInput)
//     getWeather()

// })

getPokemon()
getWeather()


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

function getPokemon() {
    
    let thePokemon = "rattata"
    let pokemonURL = "https://pokeapi.co/api/v2/pokemon/" + thePokemon

    $.ajax({
        url: pokemonURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        
        let pokemonResults = response

        console.log(pokemonResults.name)
        console.log(pokemonResults.types[0].type.name)
        console.log(pokemonResults.sprites.front_default)
        console.log(pokemonResults.id)

        let id = pokemonResults.id

        getPokemonEvolution(id)



        //can do shiny pokemon - do have png under sprites
    })

    
}

function getPokemonEvolution(evolution) {

    let theID = evolution
    let pokemonURL = "https://pokeapi.co/api/v2/evolution-chain/"

    $.ajax({
        url: pokemonURL,
        method: "GET"
    }).then(function(response) {

        console.log(response)
    })

}