import { defineConfig } from "astro/config";

import path from "path";

import solid from "@astrojs/solid-js";
import sitemap from "@astrojs/sitemap";

import twoslash from "remark-shiki-twoslash";

// https://astro.build/config
export default defineConfig({
	integrations: [solid(), sitemap()],
    markdown: {
        shikiConfig: {
            theme: "one-dark-pro"
        }
        // remarkPlugins: [
        //     'remark-gfm',
		// 	'remark-smartypants',
        //     [twoslash.default, {
        //         theme: "one-dark-pro"
        //     }]
        // ]
    },
    vite: {
        resolve: {
            alias: {
                "~": path.resolve("./src")
            }
        }
    }
});
