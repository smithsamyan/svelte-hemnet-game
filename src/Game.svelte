<script>
  import { query } from "svelte-apollo";
  import { GET_LISTINGS } from "./queries";
  const listings = query(GET_LISTINGS);
  let price;  
</script>

{#if $listings.loading}
  <p>Loading…</p>
  {:else if $listings.error}
  <p>Error: {$listings.error.message}</p>
{:else}
  {#each $listings.data.searchForSaleListings.listings as listing (listing.id)}
    <Listing listing={listing}>
  {/each}
{/if}