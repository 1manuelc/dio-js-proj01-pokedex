const apiHandler = {};

const convertJsonPokemonToModel = (jsonPokemon) => {
	return (actualPokemon = new Pokemon(
		jsonPokemon.order,
		jsonPokemon.name,
		jsonPokemon.types.map((number) => number.type.name),
		jsonPokemon.sprites.other.dream_world.front_default
	));
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
