function getPokemon(poke) {

  let thePokemon = poke
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
      console.log(pokemonResults.height)
      console.log(pokemonResults.weight)

      $("#height").html(pokemonResults.height)
      $("#weight").html(pokemonResults.weight)
    
      let pokemonName = pokemonResults.name

      searchDex(pokemonName)      
  })
  
}

function searchDex(name) {

  let pokiURL = "https://pokeapi.co/api/v2/pokemon/" + name

  $.ajax({
    url: pokiURL,
    method: "GET"
  }).then(function(response) {

    let dexRes = response.name
    let typing = response.types[0].type.name
    let pokiMg = response.sprites.front_default;

    let im = $("<img>").attr("src", pokiMg)              

    $("#PokiMg").append(im)
    
    isWeatherBoosted(typing)

  })
}


function isWeatherBoosted(type) {

  let code = temp2
  let pokemonType = type;
  console.log(code)
  console.log(pokemonType)


  const weatherType = {
      "sunny": ["fire", "grass", "ground"],
      "partly cloudy": ["normal", "rock"],
      "cloudy": ["fairy", "fighting", "poison"],
      "rainy": ["water", "electric", "bug"],
      "snowy": ["ice", "steel"],
      "foggy": ["dark", "ghost"],
      "windy": ["dragon", "flying", "psychic"]
  }

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

  let boosted = isBoosted(code, pokemonType)
  console.log(boosted);

  function isBoosted(code, type) {
      if (weatherType[weatherCodes[code]].indexOf(pokemonType) > -1) {
        console.log("boosted")
          return true
      } else {
        console.log("not boosted")
          return false
      }
  }

    
  }
