const listContainer = document.getElementById("pokemon__list");
const btnLoadMore = document.getElementById("button__loadmore");
const btnSwitchTheme = document.getElementById("button__switchTheme");
let themeIsLight = false;

const limit = 10;
let offset = 0;
const maxItems = 151;

async function loadPokemons(offset, limit) {
	htmlHandler.addLoadingAnimation();

	const pokemonList = await apiHandler.getPokemons(offset, limit);
	listContainer.innerHTML += pokemonList
		.map(htmlHandler.convertPokemonToListItem)
		.join("");

	htmlHandler.removeLoadingAnimation();
}

btnLoadMore.addEventListener("click", () => {
	offset += limit;
	const itemsOnPage = offset + limit;

	if (itemsOnPage >= maxItems) {
		const lastLimit = maxItems - offset;
		loadPokemons(offset, lastLimit);

		btnLoadMore.setAttribute("disabled", "");
		btnLoadMore.innerHTML = "End of the Pokedex list!";
	} else {
		loadPokemons(offset, limit);
	}
});

btnSwitchTheme.addEventListener("click", () => {
	if (themeIsLight) {
		htmlHandler.setDarkTheme();
		themeIsLight = false;
	} else {
		htmlHandler.setLightTheme();
		themeIsLight = true;
	}
});

(function main() {
	htmlHandler.addLoadingAnimation();
	loadPokemons(offset, limit);
})();
