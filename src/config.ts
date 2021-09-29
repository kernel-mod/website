export const SITE = {
	title: "Your Documentation Website",
	description: "Your website description.",
	defaultLanguage: "en_US",
};

export const OPEN_GRAPH = {
	image: {
		src: "https://github.com/snowpackjs/astro/blob/main/assets/social/banner.png?raw=true",
		alt:
			"astro logo on a starry expanse of space," +
			" with a purple saturn-like planet floating in the right foreground",
	},
	twitter: "astrodotbuild",
};

export const KNOWN_LANGUAGES = {
	English: "en",
};

// Uncomment this to add an "Edit this page" button to every page of documentation.
export const GITHUB_EDIT_URL = `https://github.com/kernel-mod/website/blob/master/`;

// Uncomment this to add an "Join our Community" button to every page of documentation.
export const COMMUNITY_INVITE_URL = `https://discord.gg/8mPTjTZ4SZ`;

// Uncomment this to enable site search.
// See "Algolia" section of the README for more information.
// export const ALGOLIA = {
//   indexName: 'XXXXXXXXXX',
//   apiKey: 'XXXXXXXXXX',
// }

export const SIDEBAR = {
	en: [
		{ text: "Welcome", header: true },
		{ text: "Introduction", link: "en" },
		{ text: "Installation", link: "en/installation" },
		{ text: "Building From Source", link: "en/building-from-source" },

		{ text: "Packages", header: true },
		{ text: "Structure", link: "en/packages/structure" },
	],
};
