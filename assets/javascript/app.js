getLocation()

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
let seconds = 10

let dexRefresh = setInterval(timerUpdate, 1000)

var firebaseConfig = {
    apiKey: "AIzaSyBlUXLLW6bchhS3Niw7AIrlNyOyPJSYYX8",
    databaseURL: "https://pokedex-4f772.firebaseio.com",
  };

firebase.initializeApp(firebaseConfig);

let database = firebase.database();

$("#submitBtn").on("click", function(event) {

    event.preventDefault()
    
    let userInput = $("#search").val().trim().toLowerCase()

    if (userInput === "") {
        console.log("you need to type something in.")
        return
    }

    for (let i = 0 ; i < thePokeDex.length ; i++ ) {
    
        if (userInput === thePokeDex[i].name) {
            console.log("this already exists")
            $("#noPokemon").modal('show')
            return
        }
    } 

    if (userInput.includes(" ")) userInput = userInput.replace(" ", "-")

    getPokemon(userInput)
    $("#search").val("")
    processPokeDex()
})

function getLocation() {

    $("#location").html("Location unknown.")
    $("#weather").html("Weather unknown.")

    navigator.geolocation.getCurrentPosition(function(position){
        
        if (navigator.geolocation) {

            let latitude  = position.coords.latitude;
            let longitude = position.coords.longitude;

            $("location").html("Please Wait - Your Location is Loading.")

            $.get( "https://maps.googleapis.com/maps/api/geocode/json?latlng="+ latitude + "," + longitude + "&key=AIzaSyBlUXLLW6bchhS3Niw7AIrlNyOyPJSYYX8", function(data) {
                    console.log(data)
            $("#location").html(`Your location is ${data.results[4].formatted_address}.`)
            }) 
            
            getWeather(latitude, longitude)
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
        console.log(weatherResults)
        let theWeatherCode = Number(weatherResults[0].weather.code)
        console.log(theWeatherCode)
        if (weatherCodes.hasOwnProperty(theWeatherCode)) theWeatherCondition = weatherCodes[theWeatherCode]
        $("#weather").html(`The weather in your area is currently ${theWeatherCondition}.`)

    })
}

function errorHandling() {
    $("#errorMessage").modal('show')
  }
  
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
  
      let pokeImage = $("<td>").addClass("tRow").html(pokeSprite);
      let pokeImageShiny = $("<td>").addClass("tRow").html(pokeShiny);    
      let pokeName = $("<td>").text(name);
      let pokeNumber = $("<td>").text(number);
  
      theRow1.append(pokeImage, pokeImageShiny);
      theRow2.append(pokeNumber, pokeName);
  
      theRow1.appendTo("#photo");
      theRow2.appendTo("#discovered");
  
      // attack, height and weight table
  
      let attack = pokemonResults.moves[0].move.name;
  
      if (attack.includes("-")) attack = attack.replace("-", " ")  
  
      let height = pokemonResults.height;
      let weight = pokemonResults.weight;
  
      let theRow3 = $("<tr>");
  
      let pokeAttack = $("<td>").text(attack);
      let pokeHeight = $("<td>").text(height);
      let pokeWeight = $("<td>").text(weight);
  
      theRow3.append(pokeAttack, pokeHeight, pokeWeight);
  
      theRow3.appendTo("#stats");
  
      let isBoosted = "No";
  
      if (weatherConditions[theWeatherCondition].indexOf(type) > -1) isBoosted = "Yes";
      
      let theRow4 = $("<tr>");   
      let pokeType = $("<td>").text(type);
      let pokeWeather =$("<td>").text(`${thePokeTypeFavorableWeather[type]} weather`);
      let boosted = $("<td>").text(isBoosted);
  
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
  
      console.log(sv)
      
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
      button.text("X");
  
      let isBoosted = "No";
  
      if (weatherConditions[theWeatherCondition].indexOf(type) > -1) isBoosted = "Yes";
  
      let tRow = $("<tr>")
  
      let theButton = $("<td>").html(button)
      let theSprite = $("<td>").html(theImage)
      let theNumber = $("<td>").text(number)
      let theName = $("<td>").text(name)
      let theType = $("<td>").text(type)
      let boosted = $("<td>").text(isBoosted);
  
      tRow.append(theButton, theSprite, theNumber, theName, theType, boosted)
  
      $("#saved").prepend(tRow)
  
      console.log("this is the end")
    }
  }
  
  $(document).on("click", ".pokeButton", function() {
    let theClicked = $(this).attr("logPokemon");
    console.log(theClicked)
    thePokeDex.splice(theClicked, 1);
    processPokeDex(thePokeDex)  
    localStorage.setItem("thePokeDex", JSON.stringify(thePokeDex))
  
  });
  
  function timerUpdate() {
  
    seconds--
  
    if (seconds === 1) {
    }
  
    if (seconds === 0) { 
        seconds = 10
        // getLocation()
        processPokeDex()
    }
     
  }
  
  processPokeDex()  
