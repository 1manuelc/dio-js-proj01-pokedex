const listContainer = document.getElementById("pokemon__list");
const btnLoadMore = document.getElementById("button__loadmore");

const limit = 10;
let offset = 0;
const maxItems = 151;

async function loadPokemons(offset, limit) {
	htmlHandler.toggleLoadingAnimation();

	const pokemonList = await apiHandler.getPokemons(offset, limit);
	listContainer.innerHTML += pokemonList
		.map(htmlHandler.convertPokemonToListItem)
		.join("");

	htmlHandler.toggleLoadingAnimation();
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

(function main() {
	loadPokemons(offset, limit);
})();
