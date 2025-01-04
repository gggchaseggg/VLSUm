<script lang="ts">
  import Card from "../components/Card.svelte";
  import Form from "../components/Form.svelte";
  import { PRODUCTS_LIST } from "../data";
  import type { Product } from "../types";

  let cart = JSON.parse(localStorage.getItem("cart") as string) || [];
  let cartItems: Product[] = [];

  PRODUCTS_LIST.forEach(({ products }) => {
    cartItems.push(...products);
  });

  cartItems = cartItems.filter(({ id }) => cart.includes(id));
</script>

<div class="cart">
  <div class="cart_products">
    {#each cartItems as product (product.id)}
      <Card {product} />
    {/each}
  </div>
  <div class="cart_delivery">
    <Form />
  </div>
</div>
