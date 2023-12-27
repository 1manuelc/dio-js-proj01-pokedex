class Pokemon {
	number;
	name;
	types = [];
	mainType;
	image;

	constructor(number, name, types, image) {
		this.number = number;
		this.name = name;
		this.types = types;
		this.mainType = types[0];
		this.image = image;
	}
}
