<script context="module">
	import Nav from "../components/Nav.svelte";

	export let segment;

	import h1 from "../components/Basic.svelte";

	export { h1 };
</script>

<Nav {segment} />

<main>
	<slot />
</main>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
