<script>
	import { page } from "$app/stores";
	import logo from "./svelte-logo.svg";

	import Button from "$lib/discord-ui-svelte/Button.svelte";
</script>

<header>
	<nav>
		<ul>
			<li>
				<a sveltekit:prefetch href="/">
					<Button disabled={$page.path === "/"} fullWidth={true}>Home</Button>
				</a>
			</li>
			<li>
				<a sveltekit:prefetch href="/about">
					<Button disabled={$page.path === "/about"} fullWidth={true}>About</Button>
				</a>
			</li>
			<li>
				<a sveltekit:prefetch href="/todos">
					<Button disabled={$page.path === "/todos"} fullWidth={true}>Todos</Button>
				</a>
			</li>
			<li>
				<a sveltekit:prefetch href="/core-docs">
					<Button disabled={$page.path === "/core-docs"} fullWidth={true}>Core Docs</Button>
				</a>
			</li>
		</ul>
	</nav>
</header>

<style>
	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;

		display: flex;
		justify-content: space-evenly;
		width: 100%;
	}

	a {
		text-decoration: none;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: #2f3136;
		width: 100%;
	}
</style>
