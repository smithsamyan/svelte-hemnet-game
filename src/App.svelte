<script>
	import SplashScreen from './SplashScreen.svelte';

  let started = false;
</script>

<main>
	{#if (!started)}
		<SplashScreen on:click="{() => {started = true}}"/>
		{:else}
		Started
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 800px;
		margin: 0 auto;
	}
</style>