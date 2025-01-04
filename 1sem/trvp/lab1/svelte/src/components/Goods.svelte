<script>
  import Card from "./Card.svelte";
  export let productLists = [];
</script>

{#each productLists as { title, products }}
  <div class="goods" key={title}>
    <h3 class="goods_title">{title}</h3>
    <div class="goods_products">
      {#each products as product}
        <Card {product} key={product.name + product.cost} />
      {/each}
    </div>
  </div>
{/each}
