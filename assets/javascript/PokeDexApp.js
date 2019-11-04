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
      
    console.log(pokemonResults.name);
    console.log(pokemonResults.types[0].type.name);
    console.log(pokemonResults.sprites.front_default);
    console.log(pokemonResults.id);
    console.log(pokemonResults.height);
    console.log(pokemonResults.weight);
    console.log(pokemonResults.sprites.front_default);

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
    let boosted = $("<td>").text(isBoosted);

    theRow4.append(pokeType, boosted);
    theRow4.appendTo("#type");

    //need data to save to local storage

    // localStorage.setItem("dexEntry", number);
    // localStorage.setItem("name", name)
    // localStorage.setItem("type", type )
    // localStorage.setItem("sprite", sprite )
    // localStorage.setItem("weatherBoosted", isBoosted)

    // let theRow = $("<tr>");

    // let storedDex = $("<td>").html(localStorage.getItem("dexEntry", number));
    // let storedName = $("<td>").html(localStorage.getItem("name", name));
    // let storedType = $("<td>").html(localStorage.getItem("type", type ));
    // let storedSprite = $("<td>").html(localStorage.getItem("sprite", sprite));
    // let storedBoosted = $("<td>").html(localStorage.getItem("weatherBoosted", isBoosted));

    // let storedImage = $("<img>")
    // .attr("src", storedSprite)
    // .addClass("pokeSprite");

    //   theRow.append(storedImage, storedDex, storedName , storedType , storedBoosted );
    //   theRow.appendTo("#saved");
  });
}
