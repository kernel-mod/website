<script>
	import Navigation from "../components/Navigation.svelte";

	export let segment;
</script>

<Navigation {segment} />

<main>
	<slot />
</main>

<style>
	main {
		position: relative;
		max-width: 56em;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
