<script>
	import Header from "$lib/Header/index.svelte";
	import DocsSidebar from "$lib/DocsSidebar/index.svelte";
	import docs from "./docs.json";
	import tutorials from "./tutorials.json";
	import { page } from "$app/stores";
</script>

<Header />

<div class="container">
	<DocsSidebar {docs} {tutorials} />
	{#if $page.path === "/core-docs"}
		<main>
			<slot />
		</main>
	{:else}
		<main>
			{docs}
		</main>
	{/if}
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: min-content auto;
	}

	main {
		padding: 8px;
	}
</style>
