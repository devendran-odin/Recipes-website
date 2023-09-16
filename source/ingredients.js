const recipeTemplate = document.getElementById("recipe-template");
const recipeSkeleton = document.getElementById("recipe-skeleton-template");
const conatinerTwo = document.getElementById("conatiner-two");
const hamburgerMenu = document.getElementById("hamburger-menu");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuCloseBtn = document.getElementById("mobileMenuCloseBtn");
const links = document.querySelectorAll(".links");
const navbar = document.getElementById("navbar");
const footer = document.getElementById("footer");

//switching to mobile nav links
hamburgerMenu.addEventListener("click", () => {
	navbar.classList.add("hidden");
	mobileMenu.classList.toggle("hidden");
	recipeTemplate.classList.add("hidden");
	conatinerTwo.classList.add("hidden");
	footer.classList.toggle("hidden");
	gsap.from("#mobile-menu", { duration: 1, x: "-100%", ease: "power4" });
});

//switching back to mobile home screen
mobileMenuCloseBtn.addEventListener("click", () => {
	mobileMenu.classList.toggle("hidden");
	navbar.classList.remove("hidden");
	conatinerTwo.classList.remove("hidden");
	footer.classList.toggle("hidden");
	if (conatinerTwo.classList.contains("load-data")) {
		recipeTemplate.classList.remove("hidden");
	}
});

async function getRecipeDetails(recipeClicked) {
	conatinerTwo.append(recipeSkeleton.content.cloneNode(true));

	const url = "http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23";
	const ID = "31d550d7";
	const key = "f2a10067d78935d7d68ea9ee9e9edd12";
	// getting the recipe id from the large url
	const recipeID = recipeClicked.substring(44);

	const res = await fetch(
		`https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=${url}${recipeID}&app_id=${ID}&app_key=${key}`
	);

	const recipeData = await res.json();
	const hit = recipeData.hits[0];
	const ingredients = hit.recipe.ingredients;
	const numberOfIngredients = ingredients.length;
	const calories = Math.trunc(hit.recipe.calories);

	let time = hit.recipe.totalTime;
	if (time == "0") {
		time = "20";
	}

	document.querySelector("[data-label]").textContent = hit.recipe.label;
	document.querySelector("[data-source]").textContent = hit.recipe.source;
	document.querySelector("[data-time]").textContent = time;
	document.querySelector("[data-numberOfIngredients]").textContent =
		numberOfIngredients;
	document.querySelector("[data-calories]").textContent = calories;
	document.querySelector("[data-image]").src = hit.recipe.image;
	document.querySelector("[data-meal]").textContent = hit.recipe.mealType[0];
	document.querySelector("[data-cusine]").textContent =
		hit.recipe.cuisineType[0];

	const details = document.querySelectorAll("[data-details]");
	for (let i = 0; i < 9; i++) {
		details[i].textContent = hit.recipe.healthLabels[i];
	}
	const referenceLink = document.querySelectorAll("[data-link]");
	referenceLink[0].href = hit.recipe.url;
	referenceLink[1].href = hit.recipe.url;

	const ingredientsList = document.getElementById("ingredients-list");

	for (let ingredient of ingredients) {
		const list = document.createElement("li");
		list.textContent = ingredient.text;
		list.classList.add("ingredient-style");
		ingredientsList.append(list);
	}
	conatinerTwo.classList.add("load-data");
	conatinerTwo.innerHTML = "";
	recipeTemplate.classList.remove("hidden");
}

const recipeURL = localStorage.getItem("recipeURL");

getRecipeDetails(recipeURL);
