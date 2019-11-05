let thePokeDex = []
let seconds = 10

let dexRefresh = setInterval(timerUpdate, 1000)

var firebaseConfig = {
    apiKey: "AIzaSyBlUXLLW6bchhS3Niw7AIrlNyOyPJSYYX8",
    databaseURL: "https://pokedex-4f772.firebaseio.com",
  };

firebase.initializeApp(firebaseConfig);

let database = firebase.database();

function getPokemon(poke) {
  
  $("tbody").empty()

  let thePokemon = poke;
  let pokemonURL = "https://pokeapi.co/api/v2/pokemon/" + thePokemon;

  $.ajax({
    url: pokemonURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    let pokemonResults = response; 

    // sprite, name and number table

    let sprite = pokemonResults.sprites.front_default;
    let shiny = pokemonResults.sprites.front_shiny;
    let name = pokemonResults.name;
    let number = pokemonResults.id;
    let type = pokemonResults.types[0].type.name;

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
    let pokeWeather =$("<td>").text("This feature is coming soon!");
    let boosted = $("<td>").text(isBoosted);

    theRow4.append(pokeType, pokeWeather, boosted);
    theRow4.appendTo("#type");

    database.ref().push({
      sprite: sprite,
      number: number,
      name: name,
      type: type,
    })
  });
}

database.ref().on("child_added", function(snapshot){
        
  thePokeDex.push(snapshot.val())
  processPokeDex()
  // console.log(snapshot.val())
  // console.log(thePokeDex)
  
})

function processPokeDex() {

  $("#saved").empty()

  for (let i = 0; i < thePokeDex.length; i++ ) {
    let sv = thePokeDex[i]

    console.log(sv)
    
    let sprite = sv.sprite
    let number = sv.number
    let name = sv.name
    let type = sv.type

    let theImage = $("<img>")
    .attr("src", sprite)
    .addClass("pokeSprite");

    let isBoosted = "No";

    if (weatherConditions[theWeatherCondition].indexOf(type) > -1) isBoosted = "Yes";

    let tRow = $("<tr>")

    let theSprite = $("<td>").html(theImage)
    let theNumber = $("<td>").text(number)
    let theName = $("<td>").text(name)
    let theType = $("<td>").text(type)
    let boosted = $("<td>").text(isBoosted);

    tRow.append(theSprite, theNumber, theName, theType, boosted)

    $("#saved").prepend(tRow)

    console.log("this is the end")
  }
}

function timerUpdate() {

  seconds--

  $("#update").text(`Next update in ${seconds} Seconds`)

  if (seconds === 1) {
    $("#update").text(`Next update in ${seconds} Second`)
  }

  if (seconds === 0) {
    $("#update").text(`Updating Location and Weather Boosted Stats.`)
      seconds = 10
      getLocation()
      processPokeDex()

  }
  
}