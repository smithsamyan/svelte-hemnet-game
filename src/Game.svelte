<script>
	import { slide, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

  import Listing from './Listing.svelte';
  

  import { query } from "svelte-apollo";
  import { GET_LISTINGS } from "./queries";
  const listings = query(GET_LISTINGS);

  let points = 0;
  let currentListing = 0;
  $: listing = $listings?.data?.searchForSaleListings?.listings[currentListing];
</script>

{#if $listings.loading}
  <p>Loading…</p>
{:else if $listings.error}
  <p>Error: {$listings.error.message}</p>
{:else}
  <p class="information">
    <span>Steg {currentListing + 1}/{$listings.data.searchForSaleListings.listings.length}</span>
    <span>
      Poäng: 
      {#key points}
        <span in:fly="{{ duration: 1000, x: 0, y: -30, opacity: 0.5, easing: quintOut}}" class="points">{points}</span>
      {/key}
    </span>
  </p>
  {#if listing}
    {#key listing }
      <div key="{listing.id}" in:fly="{{ duration: 1000, x: 300, y: 0, opacity: 0.5, easing: quintOut}}">
        <Listing listing={listing} on:points="{(e) => {points += e.detail.points}}" on:next="{() => currentListing += 1}" />
      </div>
    {/key}
  {/if}
{/if}

<style>
  .points {
    display: inline-block;
    color: green;
  }
  
  .information {
    display: flex;
    gap: 20px;
    font-size: 28px;
  }
</style>