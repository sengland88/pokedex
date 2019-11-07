// function errorHandling() {
//   console.log("this doesn't work")
// }

// function getPokemon(poke) {
  
//   $("tbody").empty()

//   let thePokemon = poke;
//   let pokemonURL = "https://pokeapi.co/api/v2/pokemon/" + thePokemon;

//   $.ajax({
//     url: pokemonURL,
//     method: "GET",
//     error: errorHandling
//   }).then(function(response) {

//     let pokemonResults = response; 

//     // sprite, name and number table

//     let sprite = pokemonResults.sprites.front_default;
//     let shiny = pokemonResults.sprites.front_shiny;
//     let name = pokemonResults.name;
//     let number = pokemonResults.id;
//     let type = pokemonResults.types[0].type.name;

//     if (name.includes("-")) name = name.replace("-", " ")  

//     let theRow1 = $("<tr>");
//     let theRow2 = $("<tr>");

//     let pokeSprite = $("<img>")
//       .attr("src", sprite)
//       .addClass("pokeSprite");

//     let pokeShiny = $("<img>")
//     .attr("src", shiny)
//     .addClass("pokeSprite");

//     let pokeImage = $("<td>").addClass("tRow").html(pokeSprite);
//     let pokeImageShiny = $("<td>").addClass("tRow").html(pokeShiny);    
//     let pokeName = $("<td>").text(name);
//     let pokeNumber = $("<td>").text(number);

//     theRow1.append(pokeImage, pokeImageShiny);
//     theRow2.append(pokeNumber, pokeName);

//     theRow1.appendTo("#photo");
//     theRow2.appendTo("#discovered");

//     // attack, height and weight table

//     let attack = pokemonResults.moves[0].move.name;

//     if (attack.includes("-")) attack = attack.replace("-", " ")  

//     let height = pokemonResults.height;
//     let weight = pokemonResults.weight;

//     let theRow3 = $("<tr>");

//     let pokeAttack = $("<td>").text(attack);
//     let pokeHeight = $("<td>").text(height);
//     let pokeWeight = $("<td>").text(weight);

//     theRow3.append(pokeAttack, pokeHeight, pokeWeight);

//     theRow3.appendTo("#stats");

//     let isBoosted = "No";

//     if (weatherConditions[theWeatherCondition].indexOf(type) > -1) isBoosted = "Yes";
    
//     let theRow4 = $("<tr>");   
//     let pokeType = $("<td>").text(type);
//     let pokeWeather =$("<td>").text(`${thePokeTypeFavorableWeather[type]} weather`);
//     let boosted = $("<td>").text(isBoosted);

//     theRow4.append(pokeType, pokeWeather, boosted);
//     theRow4.appendTo("#type");

//     $(".startUp").show()

//     thePokeDex.push({      
//       number: number,
//       name: name,   
//       sprite: sprite,
//       type: type,  
//     })
//     localStorage.setItem("thePokeDex", JSON.stringify(thePokeDex))
//   });
// }

// function processPokeDex() {

//   $("#saved").empty()

//   for (let i = 0; i < thePokeDex.length; i++ ) {
//     let sv = thePokeDex[i]

//     console.log(sv)
    
//     let sprite = sv.sprite
//     let number = sv.number
//     let name = sv.name
//     let type = sv.type

//     if (name.includes("-")) name = name.replace("-", " ")  

//     let theImage = $("<img>")
//     .attr("src", sprite)
//     .addClass("pokeSprite");

//     var button = $("<button>");

//     button.attr("logPokemon", i);
//     button.addClass("pokeButton")
//     button.text("X");

//     let isBoosted = "No";

//     if (weatherConditions[theWeatherCondition].indexOf(type) > -1) isBoosted = "Yes";

//     let tRow = $("<tr>")

//     let theButton = $("<td>").html(button)
//     let theSprite = $("<td>").html(theImage)
//     let theNumber = $("<td>").text(number)
//     let theName = $("<td>").text(name)
//     let theType = $("<td>").text(type)
//     let boosted = $("<td>").text(isBoosted);

//     tRow.append(theButton, theSprite, theNumber, theName, theType, boosted)

//     $("#saved").prepend(tRow)

//     console.log("this is the end")
//   }
// }

// $(document).on("click", ".pokeButton", function() {
//   let theClicked = $(this).attr("logPokemon");
//   console.log(theClicked)
//   thePokeDex.splice(theClicked, 1);
//   processPokeDex(thePokeDex)  
//   localStorage.setItem("thePokeDex", JSON.stringify(thePokeDex))

// });

// function timerUpdate() {

//   seconds--

//   if (seconds === 1) {
//   }

//   if (seconds === 0) { 
//       seconds = 10
//       // getLocation()
//       processPokeDex()
//   }

// }

// processPokeDex()
