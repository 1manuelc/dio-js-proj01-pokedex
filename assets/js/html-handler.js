const htmlHandler = {};

const loadingContainer = document.querySelector(".loading__container");

const btnSwitchTheme = document.getElementById("button__switchTheme");
let themeIsLight = true;
const moonIcon = document.getElementById("icon__moon");
const sunIcon = document.getElementById("icon__sun");

htmlHandler.addLoadingAnimation = () => {
	loadingContainer.style.display = "flex";
	btnLoadMore.style.display = "none";
};

htmlHandler.removeLoadingAnimation = () => {
	loadingContainer.style.display = "none";
	btnLoadMore.style.display = "block";
};

btnSwitchTheme.addEventListener("click", () => {
	document.querySelector("body").classList.toggle("theme--dark");
	document.querySelector("main").classList.toggle("theme--dark");
	document.querySelector("footer").classList.toggle("theme--dark");

	if (themeIsLight) {
		sunIcon.style.display = "block";
		moonIcon.style.display = "none";
		themeIsLight = false;
	} else {
		sunIcon.style.display = "none";
		moonIcon.style.display = "block";
		themeIsLight = true;
	}
});

const mapPokemonTypesToListItems = (types) => {
	return types.map(
		(type) =>
			`<li class="pokemon__type pokemon__type--${type.toLowerCase()}">${type}</li>`
	);
};

const mapPokemonStatsToListItems = (pokemonObject) => {
	return pokemonObject.baseStats.map((stat) => `<li><span>${stat}</span></li>`);
};

htmlHandler.convertPokemonToListItem = (pokemon) => {
	return `
  <li class="pokemon__item pokemon__type--${pokemon.mainType.toLowerCase()}" onclick="showPokemonModal(themeIsLight);">
    <span class="pokemon__header">
      <span class="pokemon__name">${pokemon.name}</span>
      <span class="pokemon__number">#${pokemon.number}</span>
    </span>

    <div class="pokemon__main">
      <ol class="pokemon__types">
        ${mapPokemonTypesToListItems(pokemon.types).join("")}
      </ol>

      <img
        src="${pokemon.image}"
        alt="${pokemon.name}"
        class="pokemon__image" />
    </div>
  </li>
  `;
};
