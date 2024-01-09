const apiHandler = {};
const pokemonCacheList = [];

const convertJsonPokemonToModel = (jsonPokemon) => {
	const actualPokemon = new Pokemon(
		jsonPokemon.order,
		jsonPokemon.name,
		jsonPokemon.types.map((slot) => slot.type.name),
		jsonPokemon.sprites.other.dream_world.front_default,
		jsonPokemon.species.name,
		jsonPokemon.height / 10,
		jsonPokemon.weight / 10,
		jsonPokemon.abilities.map((slot) => slot.ability.name),
		jsonPokemon.stats.map((slot) => parseInt(slot.base_stat)),
		jsonPokemon.moves.map((slot) => slot.move.name)
	);
	pokemonCacheList.push(actualPokemon);
	return actualPokemon;
};

apiHandler.getPokemonDetail = async (pokemon) => {
	const response = await fetch(pokemon.url);
	const responseJson = await response.json();
	return convertJsonPokemonToModel(responseJson);
};

apiHandler.getPokemons = async (offset = 0, limit = 10) => {
	const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
	const response = await fetch(url);
	const responseJson = await response.json();
	const pokemonResults = responseJson.results;
	const promisesArray = pokemonResults.map(apiHandler.getPokemonDetail);
	return await Promise.all(promisesArray);
};
