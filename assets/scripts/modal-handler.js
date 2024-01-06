const getCachedListPokemonInfos = (pokemonName) => {
	return pokemonCacheList.filter((element) => element.name == pokemonName)[0];
};

const buildPokemonModal = (pokemonObject) => {
	return `
		<article class="pokemon__modal pokemon__type--${pokemonObject.mainType.toLowerCase()}">
			<div class="pokemon__modal--header">
				<i class="fa-solid fa-arrow-left" onclick="closePokemonModal();"></i>

				<div class="pokemon__modal--infos">
					<span class="pokemon__modal--supinfos">
						<span class="pokemon__modal--name">${pokemonObject.name}</span
						><span class="pokemon__modal--number">#${pokemonObject.number}</span>
					</span>

					<span class="pokemon__typeContainer">
						<ol class="pokemon__modal--types">
							${mapPokemonTypesToListItems(pokemonObject.types).join("")}
						</ol>
					</span>
				</div>

				<div class="pokemon__modal--image">
					<img
						src="${pokemonObject.image}"
						alt="${pokemonObject.name} image" />
				</div>
			</div>

			<div class="pokemon__modal--details">
				<nav class="details__navbar">
					<ul>
						<li id="button__about" onclick="showDetailsContent(0)">About</li>
						<li id="button__stats" onclick="showDetailsContent(1)" class="active">Base Stats</li>
						<li id="button__moves" onclick="showDetailsContent(2)">Moves</li>
					</ul>
				</nav>

				<div id="details__divider">
					<div id="details__divider--current"></div>
				</div>

				<div class="details__content">
					<div class="details__content--about">
						<ul class="description">
							<li>Species</li>
							<li>Height</li>
							<li>Weight</li>
							<li>Abilities</li>
						</ul>

						<ul class="values">
							<li>${pokemonObject.species}</li>
							<li>${pokemonObject.height.toFixed(2)}m (${(pokemonObject.height * 100).toFixed(0)}cm)</li>
							<li>${pokemonObject.weight}kg</li>
              <li>${pokemonObject.abilities.map((ab) => ab).join(", ")}.</li>
						</ul>
					</div>

					<div class="details__content--stats">
						<ul class="description">
							<li>HP</li>
							<li>Attack</li>
							<li>Defense</li>
							<li>Esp. Atk.</li>
							<li>Esp. Def.</li>
							<li>Speed</li>
							<li>Total</li>
						</ul>

						<ul class="values">
							${mapPokemonStatsToListItems(pokemonObject).join("")}
						</ul>

						<ul class="meters">
								<li><div class="currentMeter bg__range--medium" data-width="45"></div></li>
								<li><div class="currentMeter bg__range--good"></div></li>
								<li><div class="currentMeter bg__range--medium"></div></li>
								<li><div class="currentMeter bg__range--good"></div></li>
								<li><div class="currentMeter bg__range--good"></div></li>
								<li><div class="currentMeter bg__range--medium"></div></li>
								<li>
									<div
										id="totalMeter"
										class="currentMeter bg__range--medium"></div>
								</li>
							</ul>
						</div>

					<div class="details__content--moves">
						<p>(${pokemonObject.moves.length})\n${pokemonObject.moves.map((mv) => mv).join(", ")}.</p>
					</div>
				</div>
			</div>
		</article>
	`;
};

let sectionElement;

const toggleBackgroundBlur = () => {
	if (window.innerWidth > 700) {
		document.querySelector("main").classList.toggle("filter--blur");
		document.querySelector("footer").classList.toggle("filter--blur");
	}
};

const toggleMobileBackground = () => {
	if (window.innerWidth < 700) {
		document.querySelector("main").classList.toggle("is--invisible");
		document.querySelector("footer").classList.toggle("is--invisible");
	}
};

const showPokemonModal = () => {
	const clickedLi = event.currentTarget;
	const clickedPokemonName = clickedLi.innerText
		.split("\n", 1)
		.toString()
		.toLowerCase();

	const clickedPokemonObject = getCachedListPokemonInfos(clickedPokemonName);

	sectionElement = document.createElement("section");
	sectionElement.setAttribute("class", "bound__external");
	sectionElement.innerHTML = buildPokemonModal(clickedPokemonObject);

	const bodyElement = document.querySelector("body");
	bodyElement.insertAdjacentElement("afterBegin", sectionElement);

	showDetailsContent(0);
	toggleBackgroundBlur();
	toggleMobileBackground();
};

const closePokemonModal = () => {
	const bodyElement = document.querySelector("body");
	sectionElement.remove();
	toggleMobileBackground();
	toggleBackgroundBlur();
};

const showDetailsContent = (option) => {
	const aboutButton = document.querySelector("#button__about");
	const statsButton = document.querySelector("#button__stats");
	const movesButton = document.querySelector("#button__moves");

	const aboutContent = document.querySelector(".details__content--about");
	const statsContent = document.querySelector(".details__content--stats");
	const movesContent = document.querySelector(".details__content--moves");

	const contentSlider = document.querySelector("#details__divider--current");

	switch (option) {
		case 0:
			aboutButton.classList.add("active");
			statsButton.classList.remove("active");
			movesButton.classList.remove("active");

			aboutContent.classList.remove("is--invisible");
			statsContent.classList.add("is--invisible");
			movesContent.classList.add("is--invisible");

			contentSlider.style.left = "0%";

			break;
		case 1:
			aboutButton.classList.remove("active");
			statsButton.classList.add("active");
			movesButton.classList.remove("active");

			aboutContent.classList.add("is--invisible");
			statsContent.classList.remove("is--invisible");
			movesContent.classList.add("is--invisible");

			contentSlider.style.left = "40%";

			break;
		case 2:
			aboutButton.classList.remove("active");
			statsButton.classList.remove("active");
			movesButton.classList.add("active");

			aboutContent.classList.add("is--invisible");
			statsContent.classList.add("is--invisible");
			movesContent.classList.remove("is--invisible");

			contentSlider.style.left = "80%";

			break;
	}
};
