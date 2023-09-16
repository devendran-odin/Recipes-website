const recipeContainer = document.getElementById("recipe-container");
const container = document.getElementById("conatiner");
const template = document.getElementById("card-template");
const skeletonTemplate = document.getElementById("skeleton-template");
const hamburgerMenu = document.getElementById("hamburger-menu");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuCloseBtn = document.getElementById("mobileMenuCloseBtn");
const asianRecipes = document.getElementById("asian-recipes");
const italianRecipes = document.getElementById("italian-recipes");
const links = document.querySelectorAll(".links");
const userInput = document.getElementById("user-input");
const searchBtn = document.getElementById("search-btn");
const footer = document.getElementById("footer");
const baseURL = "https://api.edamam.com/api/recipes/v2?type=public";
const apiKey = "f2a10067d78935d7d68ea9ee9e9edd12";
const apiId = "31d550d7";

async function randomRecipes() {
	// showing random dishes to the user on home page
	for (let i = 1; i <= 12; i++) {
		recipeContainer.append(skeletonTemplate.content.cloneNode(true));
	}
	// getting response
	const response = await fetch(
		`${baseURL}&app_id=${apiId}&app_key=${apiKey}&diet=balanced&dishType=Main%20course`
	);

	// after getting response removing the skeleton loading here
	recipeContainer.innerHTML = "";
	const data = await response.json();
	const hits = data.hits;

	for (let i = 2; i < 14; i++) {
		//adding each recipes to the template
		const hit = hits[i];
		const div = template.content.cloneNode(true);
		div.querySelector("[data-title]").textContent = hit.recipe.label;
		div.querySelector("[data-image]").src = hit.recipe.image;
		const uri = hit.recipe.uri;
		div.querySelector("[data-id]").setAttribute("id", uri);
		recipeContainer.append(div);
	}
}

randomRecipes();

async function getUserSelectedRecipe(input) {
	const template = document.getElementById("card-template");
	const skeletonTemplate = document.getElementById("skeleton-template");

	recipeContainer.innerHTML = "";

	for (let i = 1; i <= 12; i++) {
		recipeContainer.append(skeletonTemplate.content.cloneNode(true));
	}
	if (input == "Dinner") {
		input = "Teatime";
		hamburgerMenu;
	}
	const response = await fetch(
		`${baseURL}&app_id=${apiId}&app_key=${apiKey}&mealType=${input}&dishType=Main%20course`
	);
	const data = await response.json();
	const hits = data.hits;

	// after getting response removing the skeleton loading here
	recipeContainer.innerHTML = "";

	for (let i = 1; i < 13; i++) {
		const hit = hits[i];
		const div = template.content.cloneNode(true);
		div.querySelector("[data-title]").textContent = hit.recipe.label;
		div.querySelector("[data-image]").src = hit.recipe.image;
		const uri = hit.recipe.uri;
		div.querySelector("[data-id]").setAttribute("id", uri);
		recipeContainer.append(div);
	}
}

// showing the user clicked choice -> breakfast,lunch....
const choices = document.querySelectorAll(".choices");
choices.forEach((choice) => {
	choice.addEventListener("click", () => {
		const userChoice = choice.getAttribute("id");
		document.querySelector(".activeBorder")?.classList.remove("activeBorder");
		choice.classList.add("activeBorder");
		getUserSelectedRecipe(userChoice);
	});
});

//switching to mobile nav links
hamburgerMenu.addEventListener("click", () => {
	container.classList.add("hidden");
	mobileMenu.classList.toggle("hidden");
	recipeContainer.classList.add("hidden");
	footer.classList.toggle("hidden");
	gsap.from("#mobile-menu", { duration: 1, x: "-100%", ease: "power4" });
});

//switching back to mobile home screen
mobileMenuCloseBtn.addEventListener("click", () => {
	mobileMenu.classList.toggle("hidden");
	container.classList.remove("hidden");
	recipeContainer.classList.remove("hidden");
	footer.classList.toggle("hidden");
});

// linking to particular section in mobile design
links.forEach((link) => {
	link.addEventListener("click", () => {
		mobileMenu.classList.toggle("hidden");
		container.classList.remove("hidden");
		recipeContainer.classList.remove("hidden");
		footer.classList.toggle("hidden");
	});
});

async function getLatestAsianRecipes() {
	// showing latest asian recipes here
	const asianRecipeLabel = document.getElementById("asian-label");

	for (let i = 1; i <= 4; i++) {
		asianRecipes.append(skeletonTemplate.content.cloneNode(true));
	}
	const asianRecipesResponse = await fetch(
		`${baseURL}&app_id=${apiId}&app_key=${apiKey}&cuisineType=Asian`
	);
	const asianRecipeData = await asianRecipesResponse.json();
	const asianRecipeHits = asianRecipeData.hits;

	asianRecipes.innerHTML = "";
	asianRecipeLabel.classList.remove("hidden");

	for (let i = 0; i < 4; i++) {
		//adding each recipes to the template
		const asianLatest = asianRecipeHits[i];
		const div = template.content.cloneNode(true);
		div.querySelector("[data-title]").textContent = asianLatest.recipe.label;
		div.querySelector("[data-image]").src = asianLatest.recipe.image;
		const uri = asianLatest.recipe.uri;
		div.querySelector("[data-id]").setAttribute("id", uri);
		asianRecipes.append(div);
	}
}

async function getLatestItalianRecipes() {
	// showing latest italian recipes here
	const italianRecipeLabel = document.getElementById("italian-label");

	for (let i = 1; i <= 4; i++) {
		italianRecipes.append(skeletonTemplate.content.cloneNode(true));
	}
	const italianRecipesResponse = await fetch(
		`${baseURL}&app_id=${apiId}&app_key=${apiKey}&cuisineType=Italian`
	);
	const italianRecipeData = await italianRecipesResponse.json();
	const italianRecipeHits = italianRecipeData.hits;

	italianRecipes.innerHTML = "";
	italianRecipeLabel.classList.remove("hidden");

	for (let i = 0; i < 4; i++) {
		//adding each recipes to the template
		const italianLatest = italianRecipeHits[i];
		const div = template.content.cloneNode(true);
		div.querySelector("[data-title]").textContent =
			italianLatest.recipe.label;
		div.querySelector("[data-image]").src = italianLatest.recipe.image;
		const uri = italianLatest.recipe.uri;
		div.querySelector("[data-id]").setAttribute("id", uri);
		italianRecipes.append(div);
	}
}

setTimeout(getLatestAsianRecipes, 2000);
setTimeout(getLatestItalianRecipes, 3000);

function getIngredients(element) {
	const recipeClicked = element.getAttribute("id");
	// sets the url link in the localstorage
	localStorage.setItem("recipeURL", recipeClicked);
}

// showing indian dishes as default dishes in recipes page
localStorage.setItem("userDish", "indian");

gsap.from("#heading", { duration: 1, y: "-200%", ease: "back" });

// checking the user-input here
searchBtn.addEventListener("click", () => {
	let userSearch = userInput.value;
	if (!(userSearch == "" || userSearch == null)) {
		userSearch = userSearch.toLowerCase().trim();
		localStorage.setItem("userDish", userSearch);
		searchBtn.href = "userRecipe.html";
	}
});
