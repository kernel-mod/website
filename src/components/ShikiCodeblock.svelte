<script>
	import { onMount } from "svelte";

	import * as shiki from "shiki";
	shiki.setCDN("/shiki/");

	export let code;
	export let lang;

	const themeName = "github-dark";

	let theme;
	let tokens;

	const realLang = (() => {
		switch (lang) {
			case "jsx":
				return "js";
		}
	})();

	onMount(() => {
		const storageName = `shiki-theme-${themeName}`;
		const cachedTheme = localStorage.getItem(storageName);
		if (cachedTheme) {
			theme = JSON.parse(cachedTheme);
		} else {
			shiki
				.loadTheme(`themes/${themeName}.json`)
				.then(
					(t) => (
						localStorage.setItem(storageName, JSON.stringify(t)), (theme = t)
					)
				);
		}

		shiki
			.getHighlighter({
				theme,
				langs: [realLang],
			})
			.then((highlighter) => {
				tokens = highlighter.codeToThemedTokens(code, realLang);
			});
	});

	let copied = false;

	function copy() {
		if (copied) clearTimeout(copied);
		copied = setTimeout(() => {
			copied = false;
		}, 1e3);

		navigator.clipboard.writeText(color);
	}
</script>

<div
	class="shiki{!!tokens ? ' hl' : ' no-hl'}"
	style={theme ? `background-color: ${theme.bg}` : ""}
>
	{#if lang}
		<code
			class="language"
			style={theme
				? `color: ${theme.colors["editor.foreground"]}; border-color: ${theme.colors["editorLineNumber.foreground"]}`
				: ""}>{lang.toUpperCase()}</code
		>
	{/if}
	<code class="content">
		{#if !tokens}
			{#each code.split("\n") as part, i}
				<div class="line">
					<pre
						class="number"
						style={theme
							? `border-color: ${theme.colors["editorLineNumber.foreground"]}; color: ${theme.fg}`
							: ""}>{`${i + 1}`.padStart(code.split("\n").length.toString().length, " ")}</pre>
					<pre
						class="code">{#if part.length === 0}<span>{"\n"}</span>{:else}<span>{part}</span>{/if}</pre>
				</div>
			{/each}
		{:else}
			{#each tokens as token, i}
				<div class="line">
					<pre
						class="number"
						style={theme
							? `border-color: ${theme.colors["editorLineNumber.foreground"]}; color: ${theme.fg}`
							: ""}>{`${i + 1}`.padStart(tokens.length.toString().length, " ")}</pre>
					<pre
						class="code">{#if token.length === 0}<span>{"\n"}</span>{:else}{#each token as part}<span style="color: {part.color}">{part.content}</span>{/each}{/if}</pre>
				</div>
			{/each}
		{/if}
	</code>
	<input
		on:click={copy}
		class="copy"
		type="button"
		value={copied ? "Copied!" : "Copy"}
		style={theme
			? `background-color: ${theme.colors["editor.background"]}; color: ${theme.colors["editor.foreground"]}; border-color: ${theme.colors["editor.foreground"]}`
			: ""}
	/>
</div>

<style>
	.shiki {
		display: grid;
		grid-template-rows: min-content auto;

		font-family: menlo, inconsolata, monospace;
		font-size: calc(1em - 2px);
		padding: 0.2em 0.4em;

		border-radius: 4px;

		overflow-y: auto;
		position: relative;

		margin-top: 14px;
		margin-bottom: 14px;
	}
	.shiki .language {
		user-select: none;
		border-bottom-width: 1px;
		border-bottom-style: solid;
		white-space: pre;
	}
	.shiki pre {
		margin: 0;
		max-width: 100%;
		white-space: pre-wrap;
	}
	.shiki .line {
		display: grid;
		grid-template-columns: min-content auto;
	}
	.shiki .number {
		user-select: none;
		margin-right: 4px;
		padding-right: 4px;
		border-right-width: 1px;
		border-right-style: solid;
		white-space: pre;
	}
	.shiki:hover .copy {
		opacity: 1;
	}
	.shiki .copy {
		position: absolute;
		bottom: 4px;
		right: 4px;

		outline: none;
		cursor: pointer;

		border-radius: 4px;
		border-style: solid;
		border-width: 1px;

		opacity: 0;
		filter: brightness(0.9);
		transition-duration: 0.2s;
	}
	.shiki .copy:hover,
	.shiki .copy:focus {
		filter: brightness(1);
	}
	.shiki .copy:active {
		filter: brightness(0.8);
	}
</style>
