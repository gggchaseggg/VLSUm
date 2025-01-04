<script lang="ts">
  import { onMount } from "svelte";
  import Button from "../ui/Button.svelte";
  import Raiting from "../ui/Raiting.svelte";
  import type { Product } from "../types";
  export let product = {} as Product;

  let isInCart = product.inCart;

  const addToCart = () => {
    const cart: number[] =
      JSON.parse(localStorage.getItem("cart") as string) || [];
    if (isInCart) {
      isInCart = false;
      localStorage.setItem(
        "cart",
        JSON.stringify(cart.filter((item) => item !== product.id))
      );
    } else {
      isInCart = true;
      cart.push(product.id);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  onMount(() => {
    const cart = JSON.parse(localStorage.getItem("cart") as string) || [];
    if (cart.includes(product.id)) {
      isInCart = true;
    }
  });
</script>

<div class="product-card">
  <div class="product-card_image">
    <img src={product.image} alt={product.name} />
  </div>
  <div class="product-card_footer">
    <div class="product-card_cost">{product.cost} ₽</div>
    <div>{product.name}</div>
    <Raiting starsSelected={product.raiting} totalStars={5} />
    <Button isOrange={isInCart} onClick={addToCart}>В корзину</Button>
  </div>
</div>
