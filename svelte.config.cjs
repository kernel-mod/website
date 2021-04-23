const sveltePreprocess = require("svelte-preprocess");
const adapter = require("@sveltejs/adapter-netlify");
const pkg = require("./package.json");
const { mdsvex } = require("mdsvex");

function escape(unsafe) {
	return unsafe.replace(/`/g, "\\`");
}

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	// adapter: `@sveltejs/adapter-static`,

	preprocess: [
		sveltePreprocess(),
		mdsvex({
			extensions: [".md", `.mdx`, ".svx"],
			smartypants: true,
			highlight: false,
			layout: {
				_: "./src/routes/$highlight.svelte"
			},
			highlight: {
				highlighter: (code, lang) => {
					return `<Components.pre code={\`${escape(
						Buffer.from(code).toString("base64")
					)}\`} lang={\`${lang}\`} />`;
				}
			}
		})
	],
	extensions: [`.svelte`, ".md", `.mdx`, ".svx"],
	kit: {
		// By default, `npm run build` will create a standard Node app.
		// You can create optimized builds for different platforms by
		// specifying a different adapter
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: "body"
	}
};
