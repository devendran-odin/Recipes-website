const skeletonTemplate = document.getElementById("skeleton-template");
const template = document.getElementById("card-template");
const notFound = document.getElementById("not-found");
const hamburgerMenu = document.getElementById("hamburger-menu");
const mobileMenu = document.getElementById("mobile-menu");
const conatinerThree = document.getElementById("conatiner-three");
const mobileMenuCloseBtn = document.getElementById("mobileMenuCloseBtn");
const searchBtn = document.getElementById("search-btn");
const userInput = document.getElementById("user-input");
const footer = document.getElementById("footer");
const baseURL = "https://api.edamam.com/api/recipes/v2?type=public";
const apiKey = "f2a10067d78935d7d68ea9ee9e9edd12";
const apiId = "31d550d7";
const recipeSearchContainer = document.getElementById(
	"recipe-search-container"
);

async function getRecipes(userDish) {
	if (!notFound.classList.contains("hidden")) {
		notFound.classList.add("hidden");
	}
	recipeSearchContainer.innerHTML = "";
	for (let i = 0; i < 20; i++) {
		recipeSearchContainer.append(skeletonTemplate.content.cloneNode(true));
	}
	const response = await fetch(
		`${baseURL}&q=${userDish}&app_id=${apiId}&app_key=${apiKey}`
	);
	const data = await response.json();
	const hits = data.hits;

	recipeSearchContainer.innerHTML = "";

	// checking the dish is available or not
	if (hits.length == 0) {
		notFound.classList.toggle("hidden");
	} else {
		for (let i = 0; i < hits.length; i++) {
			//adding each recipes to the template

			const hit = hits[i];
			const div = template.content.cloneNode(true);
			div.querySelector("[data-title]").textContent = hit.recipe.label;
			div.querySelector("[data-image]").src = hit.recipe.image;
			const uri = hit.recipe.uri;
			div.querySelector("[data-id]").setAttribute("id", uri);
			recipeSearchContainer.append(div);
		}
	}
}

const userDish = localStorage.getItem("userDish");

getRecipes(userDish);

//switching to mobile nav links
hamburgerMenu.addEventListener("click", () => {
	mobileMenu.classList.toggle("hidden");
	conatinerThree.classList.add("hidden");
	footer.classList.toggle("hidden");
	gsap.from("#mobile-menu", { duration: 1, x: "-100%", ease: "power4" });
});

//switching back to mobile home screen
mobileMenuCloseBtn.addEventListener("click", () => {
	mobileMenu.classList.toggle("hidden");
	conatinerThree.classList.remove("hidden");
	footer.classList.toggle("hidden");
});

function getIngredients(element) {
	const recipeClicked = element.getAttribute("id");
	localStorage.setItem("recipeURL", recipeClicked);
}

// checking user-input here
searchBtn.addEventListener("click", () => {
	let userSearch = userInput.value;
	if (!(userSearch == "" || userSearch == null)) {
		userSearch = userSearch.toLowerCase().trim();
		getRecipes(userSearch);
	}
});
