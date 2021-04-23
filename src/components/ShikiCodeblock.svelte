<script>
	import * as shiki from "shiki";

	shiki.setCDN("/shiki/");

	export let code;
	export let lang;

	const themeName = "github-dark";

	let theme;
	const themePromise = new Promise((resolve) => {
		const storageName = `shiki-theme-${themeName}`;
		const cachedTheme = localStorage.getItem(storageName);
		if (cachedTheme) {
			resolve((console.log("Found!"), (theme = JSON.parse(cachedTheme))));
		}
		shiki
			.loadTheme(`themes/${themeName}.json`)
			.then((t) =>
				resolve(
					(localStorage.setItem(storageName, JSON.stringify(t)), (theme = t))
				)
			);
	});

	let tokens;
	const tokensPromise = new Promise((resolve) =>
		shiki
			.getHighlighter({
				theme,
				langs: [lang],
			})
			.then((highlighter) => {
				resolve((tokens = highlighter.codeToThemedTokens(code, lang)));
			})
	);

	let copied = false;
	let codeElement;

	function copy() {
		if (copied) clearTimeout(copied);
		copied = setTimeout(() => {
			copied = false;
		}, 1e3);

		window.getSelection().selectAllChildren(codeElement);
		document.execCommand("copy");
		window.getSelection().empty();
	}
</script>

{#await themePromise && tokensPromise}
	<pre><code>{code}</code></pre>
{:then}
	<div class="shiki" style="background-color: {theme.bg}">
		<code class="content" bind:this={codeElement}>
			{#each tokens as token, i}
				<div class="line">
					<pre
						class="number"
						style="border-color: {theme.colors[
							'editorLineNumber.foreground'
						]}; color: {theme.fg}">{`${i + 1}`.padStart(tokens.length.toString().length, " ")}</pre>
					<pre
						class="code">{#each token as part}<span style="color: {part.color}">{token.length === 0 ? "<br />" : part.content}</span>{/each}</pre>
				</div>
			{/each}
		</code>
		<input
			on:click={copy}
			class="copy"
			type="button"
			value={copied ? "Copied!" : "Copy"}
			style="background-color: {theme.colors[
				'editor.background'
			]}; color: {theme.colors['editor.foreground']}; border-color: {theme
				.colors['editor.foreground']}"
		/>
	</div>
{/await}

<style>
	.shiki {
		font-family: menlo, inconsolata, monospace;
		font-size: calc(1em - 2px);
		padding: 0.2em 0.4em;

		border-radius: 4px;

		overflow-y: auto;
		position: relative;

		margin-top: 14px;
		margin-bottom: 14px;
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
	.shiki .copy {
		position: absolute;
		bottom: 4px;
		right: 4px;

		outline: none;
		cursor: pointer;

		border-radius: 4px;
		border-style: solid;
		border-width: 1px;

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
