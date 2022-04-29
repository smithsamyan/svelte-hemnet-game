<script>
	import { slide, fly, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

  import Listing from './Listing.svelte';
  

  import { query } from "svelte-apollo";
  import { GET_LISTINGS } from "./queries";
  const listings = query(GET_LISTINGS);

  let points = 0;
  let currentListing = 0;
  let submitted = false;
  let done = false;
  $: listing = $listings?.data?.searchForSaleListings?.listings[currentListing];
  $: endOfGame = currentListing === $listings?.data?.searchForSaleListings?.listings.length - 1;
  $: buttonText =  endOfGame ? "Klar" : "Nästa";

  function onNextClick(){
    submitted = false;
    if(endOfGame){
      done = true;
    } else {
      currentListing += 1;
    }
  }
</script>

{#if $listings.loading}
  <p>Loading…</p>
{:else if $listings.error}
  <p>Error: {$listings.error.message}</p>
{:else}
  <p class="information">
    <span>Annons {currentListing + 1}/{$listings.data.searchForSaleListings.listings.length}</span>
    <span>
      Poäng: 
      {#key points}
        <span in:fly="{{ duration: 1000, x: 0, y: -30, opacity: 0.5, easing: quintOut}}" class="points">{points}</span>
      {/key}
    </span>
  </p>
  {#if listing && !done}
    {#key listing }
      <div key="{listing.id}" in:fly="{{ duration: 1000, x: 300, y: 0, opacity: 0.5, easing: quintOut}}">
        <Listing listing={listing} on:submitAnswer="{(e) => {points += e.detail.points; submitted = true}}" />
        {#if submitted} <button on:click="{onNextClick}">{buttonText}</button> {/if}
      </div>
    {/key}
  {/if}

  {#if done}
      <div in:scale="{{duration: 500, opacity: 0.5, easing: quintOut}}">
        <h1 class="congratulations">Grattis! Du fick <span style="color: green">{points} poäng! 🥳<span></h1>
      </div>
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

  .congratulations {
    font-size: 90px;
  }
</style>