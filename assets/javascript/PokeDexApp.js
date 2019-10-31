//this is dummy text for the on.click function
// $("#submit").on("click", function(){

//     userInput = $("#test").val().trim().toLowerCase()
//     console.log(userInput)
//     searchDex()

function searchDex(){
  let pokiURL = "https://pokeapi.co/api/v2/pokemon/"
  let poki = "pikachu"

  let dexURL = pokiURL + poki

  $.ajax({
    url: dexURL,
    method: "GET"
  }).then(function(response) {
    let dexRes = response.name 
    let typing = response.types[0].type

    console.log(response);
    console.log(dexRes)
    console.log(typing);


  })



}


searchDex()

// }) 

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

// function getPokemonEvolution() {

//     let theID = 19
//     let pokemonURL = "https://pokeapi.co/api/v2/evolution-chain/" + theID

//     $.ajax({
//         url: pokemonURL,
//         method: "GET"
//     }).then(function(response) {

//         console.log(response)
//     })

// }

// function getWeaknesses() {

//     let weak = 19
//     let weaknessURL = "https://pokeapi.co/api/v2/ability/" + weak

//     $.ajax({
//         url: weaknessURL,
//         method: "GET"
//     }).then(function(response) {

//         console.log(response)
//     })

// }

