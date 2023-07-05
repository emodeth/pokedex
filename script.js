"use strict";

const container = document.querySelector(".main-container");
const searchbar = document.querySelector("input");
const form = document.querySelector("form");

const insertPokemon = function (pokemon) {
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const type = pokemon.types[0].type.name;
  const id = pokemon.id.toString().padStart(3, 0);

  const hp = pokemon.stats[0].base_stat;
  const attack = pokemon.stats[1].base_stat;
  const defense = pokemon.stats[3].base_stat;

  const html = `
  <div class="pokemon-container">
    <div class="pokemon-image-container">
      <img
        class="pokemon-image"
        src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png"
        alt="pokemon image"
      />
    </div>
    <div class="pokemon-id">#${id}</div>
    <span class="pokemon-name">${name}</span>
    <span class="pokemon-type">${type}</span>

    <ul class="stats">
      <h1>Stats</h1>  
      <li class="hp"><span>HP</span> ${hp}</li>
      <li class="attack"><span>Attack</span> ${attack}</li>
      <li class="defense"><span>Defense</span> ${defense}</li>
    </ul>
  </div>`;

  container.insertAdjacentHTML("beforeend", html);
};

const fetchPokemon = async function (idx) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idx + 1}/`);
  const data = await res.json();

  insertPokemon(data);
};

const initPokemon = async function () {
  for (let i = 0; i < 150; i++) {
    await fetchPokemon(i);
  }
};

initPokemon();

searchbar.addEventListener("input", function (e) {
  e.preventDefault();
  const search = searchbar.value.toLowerCase();

  const pokeNames = document.querySelectorAll(".pokemon-name");
  pokeNames.forEach((pokeName) => {
    if (!pokeName.innerHTML.toLowerCase().includes(search)) {
      pokeName.parentElement.style.display = "none";
    } else {
      pokeName.parentElement.style.display = "flex";
    }
  });
  console.log(pokeNames);
});

form.addEventListener("submit", (e) => e.preventDefault());
