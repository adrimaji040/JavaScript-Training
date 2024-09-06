const $caughtPkm = document.getElementById("caughtPkm");
const $releasePkm = document.getElementById("releasePkm");
let $dialog = document.getElementById("favDialog");
let pokedexTotalArray = [];
let newPokemons = [];
let singlePokemon = {};
let offset = 0;
let limit = 20;
let pkmOverlay;
let pkmcaugh;
let pkmSelectedOverlay;
let nextUrl = "https://pokeapi.co/api/v2/pokemon/?offset=" + offset + "&limit=" + limit;

if (localStorage.getItem("Historypokedex") != null) {
  pokedexTotalArray = JSON.parse(localStorage.getItem("Historypokedex"));
  if (pokedexTotalArray.length > 0) {
    displayPokemons(pokedexTotalArray);
  } 
} else {
    getMorePokemons();
}

document.getElementById("buttonMore").addEventListener("click", async function () {
    getMorePokemons();
});

async function getMorePokemons(){
  let pokemonsRetrieved = await LoadPokedex();
  if (pokemonsRetrieved != null && pokemonsRetrieved.results.length > 0) {
    let count = pokemonsRetrieved.count;
    nextUrl = pokemonsRetrieved.next;
    newPokemons = pokemonsRetrieved.results;
    newPokemonsArr = []

    if (newPokemons.length > 0) {
      for (const pkm of newPokemons) {
        singlePokemon = {};
        singlePokemon.name = pkm.name;
        singlePokemon.caught = 'd-none';
        singlePokemon.url = pkm.url;
        let rdPokemonRetrieved = await readSinglePokemon(pkm.url);
        if (rdPokemonRetrieved) {
          //let abilities = rdPokemonRetrieved.abilities.map(ability.name);
          let abilities = Object.keys(rdPokemonRetrieved.abilities).map(function (k) {
              return rdPokemonRetrieved.abilities[k].ability.name;
            }
          );
          singlePokemon.abilities = abilities.join(", ");

          let sprites = Object.keys(
            rdPokemonRetrieved.sprites.other["official-artwork"]
          ).map(function (k) {
            return rdPokemonRetrieved.sprites.other["official-artwork"];
          });
          singlePokemon.sprites = sprites[0];

          let statsArr = Object.keys(rdPokemonRetrieved.stats).map(function (k) {
            return rdPokemonRetrieved.stats[k];
          });

          let stats = getPokemonStats(statsArr);
          singlePokemon.stats = stats;

          let types = Object.keys(rdPokemonRetrieved.types).map(function (k) {
            return rdPokemonRetrieved.types[k].type.name;
          });

          singlePokemon.types = types;
        }
        singlePokemon.nextUrl = nextUrl;
        newPokemonsArr.push(singlePokemon);
        pokedexTotalArray.push(singlePokemon);
      }
      if (newPokemonsArr.length > 0){
        displayPokemons(newPokemonsArr);
      }
      if (pokedexTotalArray.length > 0){
        localStorage.clear();  // add to local Storage
        saveLocalStorage(pokedexTotalArray);
      }
    }
  }
}

function getPokemonStats(pkmStats) {
  let stats = [];

  for (const pkmSt of pkmStats) {
    let statName = pkmSt.stat.name;
    let baseStat = pkmSt.base_stat;
    stats.push({ statName, baseStat });
  }

  return stats;
}

async function LoadPokedex() {
  if (pokedexTotalArray.length > 0){
    nextUrl = pokedexTotalArray[pokedexTotalArray.length - 1].nextUrl
  } else{
    nextUrl = "https://pokeapi.co/api/v2/pokemon/?offset=" + offset + "&limit=" + limit;
  }

  let response = await fetch(nextUrl)
    .then((response) => response.json())
    .then(function (returnedJSON) {
      return returnedJSON;
    })
    .catch((error) => {
      console.log(error);
    });

  const arrayResults = await response;
  return arrayResults;
}

async function readSinglePokemon(singlePokemonurl) {
  let response = await fetch(singlePokemonurl)
    .then((rspns) => rspns.json())
    .then(function (returnedJSON) {
      return returnedJSON;
    })
    .catch((error) => {
      console.log(error);
    });

  const arrReslts = await response;
  return arrReslts;
}

//function display Pokemons
function displayPokemons(pokemonArrayToDisplay) {
    let $pokedexDiv = document.getElementById("pokedexList");
    const previousDisplay =  $pokedexDiv.innerHTML;
  
    $pokedexDiv.innerHTML = previousDisplay + pokemonArrayToDisplay.reduce((html, objAPI) =>
        html +
        `    
            <div class="pkmContainer">
                <div class="boxPkm text-center m-2">
                    <div  id="${objAPI.name}"  class = "pkmClass"> 
                        <img src="${objAPI.sprites.front_default}" alt="${objAPI.name}" style="width:90%;">
                        <h1>${objAPI.name}</h1>
                    </div> 
                </div>
                <div id="${objAPI.name}_Overlay" class="pkmClassOverlay text-center ${objAPI.caught}" onclick="funcOverlay(${objAPI.name})" >CAUGHT</div> 
            </div>
        
        `,'');

    let pokemonDivs = document.getElementsByClassName("pkmClass");
    for (const pkdiv of pokemonDivs){
        pkdiv.addEventListener("click", async function(e){    
            let selectedPokemon = pokedexTotalArray.find((pkm) => pkm.name == e.currentTarget.id);
            pkmSelected(selectedPokemon);
            
            $releasePkm.classList.remove("d-inline");
            $releasePkm.classList.add("d-none");

            $caughtPkm.classList.add("d-inline");
            $caughtPkm.classList.remove("d-none");
        });
    }
}


function funcOverlay(pkmcaught){
    let selectedPokemon = pokedexTotalArray.find((pkm) => pkm.name == pkmcaught.id);    
    $releasePkm.classList.add("d-inline");
    $releasePkm.classList.remove("d-none");

    $caughtPkm.classList.remove("d-inline");
    $caughtPkm.classList.add("d-none");
    pkmSelected(selectedPokemon)
}

function pkmSelected(selectedPokemon){

    pkmSelectedOverlay = selectedPokemon;
    
    let $pkmImageDialog = document.getElementById("pkmImageDialog");
    $pkmImageDialog.innerHTML = '';
    $pkmImageDialog.innerHTML = 
    `<div>
        <h1>${selectedPokemon.name}</h3> <br/>
        <img src="${selectedPokemon.sprites.front_shiny}" alt="${selectedPokemon.name}" style="width:90%;">
        </div>
    `;

    let $pkmSkills = document.getElementById("pkmSkills");
    $pkmSkills.innerHTML = '';
    $pkmSkills.innerHTML = 
    `<div class="mt-3">
        <h4>Abillities</h4>
        <div class="" >${selectedPokemon.abilities}</div>
        <hr />
    </div>
    <div>
        <h4>Types</h4>
        <div class="" >${selectedPokemon.types.join(', ')}</div>
        <hr />
    </div>
    `;

    let $pkmStats = document.getElementById("pkmStats");

    let stats = selectedPokemon.stats;

    $pkmStats.innerHTML = '';

    let tableHeader = 
        `
        <h4>Stats</h4>
        <table>
        <tr>
        <th>Stat Name</th>
        <th>Base Stat</th>    
        </tr>`
    let tableBody = "";
    for (const st of stats){
        tableBody =  tableBody + 
        `<tr>
        <td>${st.statName}</td>
        <td>${st.baseStat}</td>    
        </tr>`
    }

    let tableFooter = '</table> </hr>';
    let tableHtml = tableHeader + tableBody + tableFooter;

    $pkmStats.innerHTML = tableHtml;

$dialog.showModal();
}

function saveLocalStorage(pokedexTotalArray) {
   localStorage.clear();
  let pokedexString = JSON.stringify(pokedexTotalArray);
  localStorage.setItem("Historypokedex", pokedexString);
}


//Add eventListener to the clear botton
const $clear = document.getElementById("clear");
$clear.addEventListener("click", function (e) {
  //remove all items from history
  pokedexArray = [];
  pokedexTotalArray = [];
  //remove all elents from DOM
  let $pokedexDiv = document.getElementById("pokedexList");
  $pokedexDiv.innerHTML = "";
  //clear local storage
  localStorage.clear();

  nextUrl = "https://pokeapi.co/api/v2/pokemon/?offset=" + offset + "&limit=" + limit;
});

const $cancelPkm = document.getElementById("cancelPkm");
$cancelPkm.addEventListener("click", function (e) {
    pkmSelectedOverlay = null;
  $dialog.close();
});

const $closePkm = document.getElementById("closePkm");
$closePkm.addEventListener("click", function (e) {
  $dialog.close();
});

$caughtPkm.addEventListener("click",function(e){
    pkmOverlay = "_Overlay";
    pkmcaugh = pkmSelectedOverlay.name.concat(pkmOverlay)
    pkmSelectedOverlay.caught = 'd-inline';
    document.getElementById(pkmcaugh).classList.add("pkmClassOverlay");
    document.getElementById(pkmcaugh).classList.remove("d-none")
    pkmSelectedOverlay = null;
    saveLocalStorage(pokedexTotalArray)
    $dialog.close();
});


$releasePkm.addEventListener("click",function(e){
    pkmOverlay = "_Overlay";
    pkmcaugh = pkmSelectedOverlay.name.concat(pkmOverlay);
    pkmSelectedOverlay.caught = 'd-none';
    document.getElementById(pkmcaugh).classList.remove("pkmClassOverlay");
    document.getElementById(pkmcaugh).classList.add("d-none")
    saveLocalStorage(pokedexTotalArray)
    $dialog.close();
}) 