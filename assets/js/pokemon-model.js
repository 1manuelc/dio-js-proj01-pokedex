class Pokemon {
	number;
	name;

	types = [];
	mainType;

	image;

	species;
	height;
	weight;

	abilities = [];
	baseStats = [];
	moves = [];

	constructor(
		number,
		name,
		types,
		image,
		species,
		height,
		weight,
		abilities,
		baseStats,
		moves
	) {
		this.number = number;
		this.name = name;

		this.types = types;
		this.mainType = types[0];

		this.image = image;

		this.species = species;
		this.height = height;
		this.weight = weight;

		this.abilities = abilities;
		this.baseStats = baseStats;
		baseStats.push(baseStats.reduce((number, ac) => number + ac));
		// sequence of baseStats = [hp, atk, def, spAtk, spDef, speed, totalSum]
		this.moves = moves;
	}
}
