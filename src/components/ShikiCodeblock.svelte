<script context="module">
	import { pathToFileURL } from "node:url";

	import * as shiki from "shiki";

	export let code;

	let highlighter;
	let theme;

	function escape(unsafe) {
		return unsafe.replace(/"/g, '\\"').replace(/'/g, "\\'");
	}

	shiki
		.getHighlighter({
			theme: "github-dark",
		})
		.then((h) => (highlighter = h));
	const tokens = highlighter.codeToThemedTokens(code, "js");

	shiki.loadTheme("themes/github-dark.json").then((t) => (theme = t));

	let lineNumbers = `<div class="line-numbers" style="border-color: ${theme.colors["editorLineNumber.foreground"]}; color: ${theme.fg}">`;
	let safeCode = `<div class="code">`;

	for (const token of tokens) {
		if (token.length === 0) {
			safeCode += "\n";
		}
		safeCode += "<code>";
		for (const part of token) {
			safeCode += `<span style="color: ${part.color}">{"${escape(
				part.content
			)}"}</span>`;
		}
		safeCode += "</code>";
	}

	let nums = [];
	for (let i = 0; i < tokens.length; i++) {
		lineNumbers += `<code>${i}</code>`;
	}

	lineNumbers += "</div>";
	safeCode += "</div>";

	// return `<pre class="shiki" style="background-color: ${theme.bg}">${lineNumbers}${safeCode}</pre>`;
</script>

<pre
	class="shiki">
	<div class="line-numbers"></div>
	<div class="code">
		{#each tokens as token, i}
			<code>
				{#each token as part, j}
					<span style="color: {part.color}">
						{part.content}
					</span>
				{/each}
			</code>
		{/each}
	</div>
</pre>
