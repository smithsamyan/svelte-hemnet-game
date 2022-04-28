<script>
	import SplashScreen from './SplashScreen.svelte';
	import Game from './Game.svelte';
  import { ApolloClient, InMemoryCache } from "@apollo/client";
  import { setClient } from "svelte-apollo";



  // 1. Create an Apollo client and pass it to all child components
  //    (uses svelte's built-in context)
  const client = new ApolloClient({
    uri: "https://www.hemnet.se/graphql",
		cache: new InMemoryCache()
  });
  setClient(client);

  let started = false;
</script>

<main>
	{#if !started}
		<SplashScreen on:click="{() => {started = true}}"/>
	{:else}
		<Game />
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