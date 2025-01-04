<script>
  import Star from "./Star.svelte";

  export let starsSelected = 0;
  export let totalStars = 5;
  export let onRate = () => {};

  let stars = starsSelected;

  const clickStar = (i) => {
    onRate(i + 1);
    stars = i + 1;
  };
</script>

<div class="star-rating">
  {#each Array(totalStars) as _, i}
    <Star selected={i < stars} onClick={() => clickStar(i)} />
  {/each}
</div>
