<script>
  import {createEventDispatcher} from 'svelte';

  export let listing;
  let price;
  let comparison;

  const location = `${listing.area ? listing.area + ", " : ""}${listing.municipality.fullName}`;

  const DIFFERENCE_ALLOWED = 300000;

  const numberFormatter = new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const dispatch = createEventDispatcher();

  function compare(){
    const difference = Math.abs(price - listing.askingPrice.amount);
    if(difference === 0){
      comparison = {text: "Exakt pris! Spektakulärt!", color: "darkgreen", points: 30};
    }
    else if(difference > DIFFERENCE_ALLOWED){
      comparison = {text: `Fel, Skillnaden mellan din gissning och svaret var över ${numberFormatter.format(DIFFERENCE_ALLOWED)}`, color: "red", points: 0}
    } else {
      comparison = {text: `Du var inom ${numberFormatter.format(DIFFERENCE_ALLOWED)}`, color: "green", points: 10};
    }
    dispatch('points', {points: comparison.points});
  }

  const onNextClick = () => {
    dispatch('next');
  }
  
</script>

<h1>{listing.title}</h1>
<h2>{location}</h2>
<img src={listing.thumbnail.url} />
<p>
  <span>Antal rum: {listing.numberOfRooms}</span>
  <span>Area: {listing.formattedLivingArea}</span>
  {#if listing.formattedLandArea}<span>Tomt: {listing.formattedLandArea}</span>{/if}
</p>


<label> 
  {#if !comparison}
  <p>Gissa utgångspriset inom {numberFormatter.format(DIFFERENCE_ALLOWED)}:</p>
  <input type="number" bind:value={price} />
  <button on:click="{() => compare()}" disabled="{!price}">Gissa</button>
  {:else}
    <p>Din gissning: {numberFormatter.format(price)}</p>
    <p>Riktiga utgångspriset: {numberFormatter.format(listing.askingPrice.amount)}</p>
    <p style="color: {comparison.color}">{comparison.text}</p>
    <button on:click="{onNextClick}">Nästa</button>
  {/if}

</label>