<script>
  export let selected = false;
  export let onClick = () => {};
</script>

<div class="star {selected ? 'selected' : ''}" on:click={onClick}></div>
