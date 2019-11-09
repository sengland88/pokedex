// global variables
var hasVisited = false
const theSong = new Audio("assets/audio/theme-song.mp3");
var isPlaying = false

let theWeatherCondition = "unknown"

const weatherCodes = {
    200: "rainy",
    202: "rainy",
    201: "rainy",
    200: "rainy",
    230: "rainy",
    231: "rainy",
    232: "rainy",
    233: "rainy",
    300: "rainy",
    301: "rainy",
    302: "rainy",
    500: "rainy",
    501: "rainy",
    502: "rainy",
    511: "rainy",
    520: "rainy",
    521: "rainy",
    522: "rainy",
    600: "snowy",
    601: "snowy",
    602: "snowy",
    610: "snowy",
    611: "snowy",
    612: "snowy",
    621: "snowy",
    622: "snowy",
    623: "snowy",
    700: "foggy",
    711: "foggy",
    721: "foggy",
    731: "foggy",
    741: "foggy",
    751: "foggy",
    800: "sunny",
    801: "partly cloudy",
    802: "partly cloudy",
    803: "windy",
    804: "windy",
    900: "rainy",
}

const thePokeTypeFavorableWeather = {
    "fire": "sunny",
    "grass": "sunny",
    "ground": "sunny",
    "normal": "partly cloudy",
    "rock": "partly cloudy",
    "fairy": "cloudy",
    "fighting": "cloudy",
    "poison": "cloudy",
    "water": "rainy",
    "electric": "rainy",
    "bug": "rainy",
    "ice": "snowy",
    "steel": "snowy",
    "dark": "foggy",
    "ghost": "foggy",
    "dragon": "windy",
    "flying": "windy",
    "psychic": "windy",
}

const weatherConditions = {
    "sunny": ["fire", "grass", "ground"],
    "partly cloudy": ["normal", "rock"],
    "cloudy": ["fairy", "fighting", "poison"],
    "rainy": ["water", "electric", "bug"],
    "snowy": ["ice", "steel"],
    "foggy": ["dark", "ghost"],
    "windy": ["dragon", "flying", "psychic"],
    "unknown": []
}

let thePokeDex = JSON.parse(localStorage.getItem("thePokeDex")) || [];
let seconds = 5

// variable to update timer every 1 second
let dexRefresh = setInterval(timerUpdate, 1000)

// gets the user permission and only shows the message divs
getLocation()
$(".startUp").hide()
$(".theDex").hide()

// checks to see if user is already visited before. if they have, then this code will hide the message and only display pokedex.
if (localStorage.getItem("hasVisited")) {
  $(".theMessage").hide()
  $(".startUp").show()
  $(".theDex").show()
}

// on click functions for various items
$("#activateDex").on("click", function() {

  $(".theMessage").hide()
  $(".startUp").show()
  $(".theDex").show()
  $(".second-button-group").show()
  hasVisited = localStorage.setItem("hasVisited", true)
})

$("#activateDexMusic").on("click", function() {

  $(".theMessage").hide()
  $(".startUp").show()
  $(".theDex").show()
  $(".second-button-group").show()
  playSound()
  isPlaying = true
  hasVisited = localStorage.setItem("hasVisited", true)
})

$("#the-message").on("click", function() {

  $(".theMessage").show()
  $(".startUp").hide()
  $(".second-button-group").hide()
  $(".theDex").hide()
})

$("#hide-dex").on("click", function() {
  $(".theDex").toggle();
})

$("#pause-play-music").on("click", function() {
  console.log("this is working")

  if (isPlaying === true) { 
      isPlaying = false
      pauseSound()
  } else if (isPlaying === false) {
      isPlaying = true
      playSound()
  } 
})

// on click function to handle users input - runs validation first to ensure that it is useable
$("#submitBtn").on("click", function(event) {

    event.preventDefault()
    
    let userInput = $("#search").val().trim().toLowerCase()

    if (userInput === "") {
        $("#emptySearch").modal('show')
        return
    }

    for (let i = 0 ; i < thePokeDex.length ; i++ ) {
    
        if (userInput === thePokeDex[i].name) {
            $("#noPokemon").modal('show')
            return
        }
    } 

    if (userInput.includes(" ")) userInput = userInput.replace(" ", "-")

    getPokemon(userInput)
    $("#search").val("")
    processPokeDex()
})

// gets the users location and geo reverses it to get the city and stat - displays it on the screen.
function getLocation() {

    $("#location").html("Location unknown.")
    $("#weather").html("Weather unknown.")

    navigator.geolocation.getCurrentPosition(function(position){
        
        if (navigator.geolocation) {

            let latitude  = position.coords.latitude;
            let longitude = position.coords.longitude;

            $("location").html("Please Wait - Your Location is Loading.")

            $.get( "https://maps.googleapis.com/maps/api/geocode/json?latlng="+ latitude + "," + longitude + "&key=AIzaSyBlUXLLW6bchhS3Niw7AIrlNyOyPJSYYX8", function(data) {
            $("#location").html(`Your location is ${data.results[4].formatted_address}.`)
            }) 
            
            getWeather(latitude, longitude)
        }
    })

}

// function to handle the weather - uses the lat and lon from the geolocation to determine weather around users location
function getWeather(lat , lon) {

    let theKey = "0e1a9770bdf84bbcb4d232a7900a26e1"
    let weatherURL = "https://api.weatherbit.io/v2.0/current?key=" + theKey + "&lat=" + lat + "&lon=" + lon

    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function(response) {

        let weatherResults = response.data
        let theWeatherCode = Number(weatherResults[0].weather.code)
        if (weatherCodes.hasOwnProperty(theWeatherCode)) theWeatherCondition = weatherCodes[theWeatherCode]
        $("#weather").html(`The weather in your area is currently ${theWeatherCondition}.`)

    })
}

// function to handle error messages from API
function errorHandling() {
    $("#errorMessage").modal('show')
}

// function to get pokemon from API and append it to the html
function getPokemon(poke) {
  
  $("tbody").empty()

  let thePokemon = poke;
  let pokemonURL = "https://pokeapi.co/api/v2/pokemon/" + thePokemon;

  $.ajax({
    url: pokemonURL,
    method: "GET",
    error: errorHandling
  }).then(function(response) {

    let pokemonResults = response; 

    // sprite, name and number table

    let sprite = pokemonResults.sprites.front_default;
    let shiny = pokemonResults.sprites.front_shiny;
    let name = pokemonResults.name;
    let number = pokemonResults.id;
    let type = pokemonResults.types[0].type.name;

    if (name.includes("-")) name = name.replace("-", " ")  

    let theRow1 = $("<tr>");
    let theRow2 = $("<tr>");

    let pokeSprite = $("<img>")
      .attr("src", sprite)
      .addClass("pokeSprite");

    let pokeShiny = $("<img>")
    .attr("src", shiny)
    .addClass("pokeSprite");

    let pokeImage = $("<td class='align-middle'>").addClass("tRow").html(pokeSprite);
    let pokeImageShiny = $("<td class='align-middle'>").addClass("tRow").html(pokeShiny);    
    let pokeName = $("<td class='align-middle'>").text(name);
    let pokeNumber = $("<td class='align-middle'>").text(`# ${number}`);

    theRow1.append(pokeImage, pokeImageShiny);
    theRow2.append(pokeNumber, pokeName);

    theRow1.appendTo("#photo");
    theRow2.appendTo("#discovered");

    // attack, height and weight table

    let attack = pokemonResults.moves[0].move.name;

    if (attack.includes("-")) attack = attack.replace("-", " ")  

    let height = pokemonResults.height * Math.floor(3.937)
    let weight = pokemonResults.weight / Math.floor(4.536) 

    let theRow3 = $("<tr>");

    let pokeAttack = $("<td class='align-middle'>").text(attack);
    let pokeHeight = $("<td class='align-middle'>").text(`${height}"`);
    let pokeWeight = $("<td class='align-middle'>").text(`${weight} lbs`);

    theRow3.append(pokeAttack, pokeHeight, pokeWeight);

    theRow3.appendTo("#stats");

    let isBoosted = "No";

    if (weatherConditions[theWeatherCondition].indexOf(type) > -1) isBoosted = "Yes";
    
    let theRow4 = $("<tr>");   
    let pokeType = $("<td class='align-middle'>").text(type);
    let pokeWeather =$("<td class='align-middle'>").text(`${thePokeTypeFavorableWeather[type]} weather`);
    let boosted = $("<td class='align-middle'>").text(isBoosted);

    theRow4.append(pokeType, pokeWeather, boosted);
    theRow4.appendTo("#type");

    $(".startUp").show()

    thePokeDex.push({      
      number: number,
      name: name,   
      sprite: sprite,
      type: type,  
    })
    localStorage.setItem("thePokeDex", JSON.stringify(thePokeDex))
  });
}
  
function processPokeDex() {

  $("#saved").empty()

  for (let i = 0; i < thePokeDex.length; i++ ) {
    let sv = thePokeDex[i] 
    
    let sprite = sv.sprite
    let number = sv.number
    let name = sv.name
    let type = sv.type

    if (name.includes("-")) name = name.replace("-", " ")  

    let theImage = $("<img>")
    .attr("src", sprite)
    .addClass("pokeSprite");

    var button = $("<button>");

    button.attr("logPokemon", i);
    button.addClass("pokeButton")
    button.addClass("btn btn-danger")
    button.addClass("btn-sm")
    button.text(" X ");

    let isBoosted = "No";

    if (weatherConditions[theWeatherCondition].indexOf(type) > -1) isBoosted = "Yes";

    let tRow = $("<tr>")

    let theButton = $("<td class='align-middle'>").html(button)
    let theSprite = $("<td class='align-middle'>").html(theImage)
    let theNumber = $("<td class='align-middle'>").text(`# ${number}`)
    let theName = $("<td class='align-middle'>").text(name)
    let theType = $("<td class='align-middle'>").text(type)
    let boosted = $("<td class='align-middle'>").text(isBoosted);

    tRow.append(theButton, theSprite, theNumber, theName, theType, boosted)

    $("#saved").prepend(tRow)  
  }
}
  
$(document).on("click", ".pokeButton", function() {
  let theClicked = $(this).attr("logPokemon");
  thePokeDex.splice(theClicked, 1);
  processPokeDex(thePokeDex)  
  localStorage.setItem("thePokeDex", JSON.stringify(thePokeDex))

});

// functions to handle the play and pause of the song
function playSound() {  
  theSong.play();
}

function pauseSound() {
  theSong.pause();
}
  
function timerUpdate() {

  seconds--

  if (seconds === 1) {
  }

  if (seconds === 0) { 
      seconds = 5
      getLocation()
      processPokeDex()
  }
    
}

processPokeDex()  
