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
    
      let pokemonName = pokemonResults.name

      searchDex(pokemonName)



      // database.ref().push({
      //   name: pokemonResults.name,
      //   type: pokemonResults.types[0].type.name,
      //   sprite: pokemonResults.sprites.front_default,
      // })

      //can do shiny pokemon - do have png under sprites

      
  })
  
}

function searchDex(name) {

  let pokiURL = "https://pokeapi.co/api/v2/pokemon/" + name
//   let poki = "rattata"
//   let dexURL = pokiURL + poki

  $.ajax({
    url: pokiURL,
    method: "GET"
  }).then(function(response) {

    let dexRes = response.name 
    let typing = response.types[0].type
    let pokiMg = response.sprites.front_default;

    let im = $("<img>").attr("src", pokiMg)              

    $("#PokiMg").append(im)
    console.log(response);
    console.log(dexRes)
    console.log(typing);
  })
}
