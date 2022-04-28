<script>
  export let listing;
  let price;
  let comparison;

  const DIFFERENCE_ALLOWED = 300000;

  const numberFormatter = new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  function compare(){
    debugger;
    const difference = Math.abs(price - listing.askingPrice.amount);
    if(difference === 0){
      comparison = {text: "Exakt pris! Spektakulärt!", color: "darkgreen"};
    }
    else if(difference > DIFFERENCE_ALLOWED){
      comparison = {text: `Fel, Skillnaden mellan din gissning och svaret var över ${numberFormatter.format(DIFFERENCE_ALLOWED)}`, color: "red"}
    } else {
      comparison = {text: `Du var inom ${numberFormatter.format(DIFFERENCE_ALLOWED)}`, color: "green"};
    }
  }
  
</script>

<h1>{listing.title}</h1>
<h2>{listing.area}, {listing.municipality.fullName}</h2>
<img src={listing.thumbnail.url} />
<label> 
  {#if !comparison}
  <p>Gissa utgångspriset inom {numberFormatter.format(DIFFERENCE_ALLOWED)}:</p>
  <input type="number" bind:value={price} />
  <button on:click="{() => compare()}" disabled="{!price}">Gissa</button>
  {:else}
    <p>Din gissning: {numberFormatter.format(price)}</p>
    <p>Riktiga utgångspriset: {numberFormatter.format(listing.askingPrice.amount)}</p>
    <p style="color: {comparison.color}">{comparison.text}</p>
  {/if}

</label>