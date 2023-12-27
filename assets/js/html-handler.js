const htmlHandler = {};

const loadingContainer = document.querySelector(".loading__container");
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

htmlHandler.setDarkTheme = () => {
	const root = document.querySelector("html");
	root.style.setProperty("--body-bg-color", "#1a1a1a");
	root.style.setProperty("--main-bg-color", "#2b2b2b");
	root.style.setProperty("--text-color", "#fff");

	sunIcon.style.display = "block";
	moonIcon.style.display = "none";
};

htmlHandler.setLightTheme = () => {
	const root = document.querySelector("html");
	root.style.setProperty("--body-bg-color", "#e4e6eb");
	root.style.setProperty("--main-bg-color", "#fff");
	root.style.setProperty("--text-color", "#000");

	sunIcon.style.display = "none";
	moonIcon.style.display = "block";
};

const convertPokemonTypesToListItems = (types) => {
	return types.map(
		(type) =>
			`<li class="pokemon__type ${defineBgColorByType(type)}">${type}</li>`
	);
};

const typeClassColorMap = {
	normal: "pokemon__type--normal",
	fire: "pokemon__type--fire",
	grass: "pokemon__type--grass",
	ground: "pokemon__type--ground",
	water: "pokemon__type--water",
	ice: "pokemon__type--ice",
	bug: "pokemon__type--bug",
	poison: "pokemon__type--poison",
	fighting: "pokemon__type--fighting",
	psychic: "pokemon__type--psychic",
	dark: "pokemon__type--dark",
	ghost: "pokemon__type--ghost",
	rock: "pokemon__type--rock",
	steel: "pokemon__type--steel",
	dragon: "pokemon__type--dragon",
	flying: "pokemon__type--flying",
	electric: "pokemon__type--electric",
	fairy: "pokemon__type--fairy",
};

const defineBgColorByType = (mainType) => {
	return typeClassColorMap[mainType] || "";
};

htmlHandler.convertPokemonToListItem = (pokemon) => {
	return `
  <li class="pokemon__item ${defineBgColorByType(pokemon.mainType)}">
    <span class="pokemon__header">
      <span class="pokemon__name">${pokemon.name}</span>
      <span class="pokemon__number">#${pokemon.number}</span>
    </span>

    <div class="pokemon__main">
      <ol class="pokemon__types">
        ${convertPokemonTypesToListItems(pokemon.types).join("")}
      </ol>

      <img
        src="${pokemon.image}"
        alt="${pokemon.name}"
        class="pokemon__image" />
    </div>
  </li>
  `;
};
