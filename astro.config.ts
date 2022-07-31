import { defineConfig } from "astro/config";

import path from "path";

import solid from "@astrojs/solid-js";
import sitemap from "@astrojs/sitemap";
import vercel from '@astrojs/vercel/serverless';

import twoslash from "remark-shiki-twoslash";

// https://astro.build/config
export default defineConfig({
	site: "https://kernel.fish/",
	adapter: vercel(),
	integrations: [solid(), sitemap()],
	markdown: {
		shikiConfig: {
			theme: "one-dark-pro"
		},
		// remarkPlugins: [
		//     'remark-gfm',
		// 	'remark-smartypants',
		//     [twoslash, {
		//         theme: "one-dark-pro"
		//     }]
		// ]
	},
	vite: {
		build: { sourcemap: true },
		resolve: {
			alias: {
				"~": path.resolve("./src")
			}
		},
	}
});
