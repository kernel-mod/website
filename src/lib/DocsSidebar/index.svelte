<script>
	import pluralize from "pluralize";
	import TabBar from "$lib/discord-ui-svelte/TabBar.svelte";
	import TabBarItem from "$lib/discord-ui-svelte/TabBarItem.svelte";
	import { page } from "$app/stores";

	export let docs;
	export let tutorials;

	let jsdocTab = true;

	function toggleTab() {
		jsdocTab = !jsdocTab;
	}
</script>

<div class="docs-sidebar">
	<input type="button" value={jsdocTab ? "Tutorials" : "JSDoc"} on:click={toggleTab} />
	<TabBar orientation="vertical">
		<a sveltekit:prefetch href="/core-docs"><TabBarItem selected={$page.path === "/core-docs"}>README.md</TabBarItem></a>
		{#if jsdocTab}
			{#each Object.entries(docs.namepaths) as [category, items]}
				{#if items.length > 0}
					<a sveltekit:prefetch href={`/core-docs/${pluralize(category)}`}><TabBarItem selected={$page.path === `/core-docs/${pluralize(category)}`}>{pluralize(category)}</TabBarItem></a>
					{#each items as item}
						<a sveltekit:prefetch href={`/core-docs/${category}/${item}`} class="indented"><TabBarItem selected={$page.path === `/core-docs/${category}/${item}`}>{item}</TabBarItem></a>
					{/each}
				{/if}
			{/each}
		{:else}
			Tutorials
		{/if}
	</TabBar>
</div>

<style>
	.docs-sidebar {
		padding: 8px;
		background-color: var(--background-secondary);
		min-width: 240px;
	}
	.docs-sidebar a {
		padding-top: 1px;
		padding-bottom: 1px;
		text-decoration: none;
	}

	.indented {
		margin-left: 16px;
	}
</style>
