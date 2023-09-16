/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./source/*.html"],
	theme: {
		extend: {
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
				DMsans: ["DM Sans", "sans-serif"],
				DMserif: ["DM Serif Display", "serif"],
				playfair: ["Playfair Display", "serif"],
				rubik: ["Rubik", "sans-serif"],
			},
			backgroundImage: {
				mobileImage: "url('/assets/hero-banner-small.jpg')",
				laptopImage: "url('/assets/background.jpg')",
			},
			keyframes: {
				load: {
					"0%": { backgroundColor: "hsl(200,20%,90%)" },
					"50%": { backgroundColor: "hsl(200,20%,80%)" },
				},
			},
			animation: {
				load: "load 1s linear infinite alternate",
			},
		},
	},
	plugins: [],
};
