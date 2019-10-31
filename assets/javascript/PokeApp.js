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