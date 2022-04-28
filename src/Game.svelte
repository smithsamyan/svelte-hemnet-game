<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

  import Listing from './Listing.svelte';
  

  import { query } from "svelte-apollo";
  import { GET_LISTINGS } from "./queries";
  const listings = query(GET_LISTINGS);

  let points = 0;
</script>

{#if $listings.loading}
  <p>Loading…</p>
  {:else if $listings.error}
  <p>Error: {$listings.error.message}</p>
{:else}
  {#key points}
    <p transition:slide="{{delay: 250, duration: 300, easing: quintOut }}" class="points">Poäng: {points}</p>
  {/key}

  {#each $listings.data.searchForSaleListings.listings as listing (listing.id)}
    <Listing listing={listing} on:points="{(e) => {points += e.detail.points}}" />
  {/each}
{/if}

<style>
  .points {
    color: black;
    font-size: 28px;
  }
</style>