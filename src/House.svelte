<script>
  export let listing;
</script>

<h1>{listing.title}</h1>
<h2>{listing.area}, {listing.municipality.fullName}</h2>
<img src={listing.thumbnail.url} />
<label> 
  <p>Gissa utgångspriset:</p>
  <input type="number" bind:value={price} />
</label>