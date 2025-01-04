<script>
import { ref, onMounted } from "vue";
import Raiting from "../ui/Raiting.vue";
import Button from "../ui/Button.vue";

export default {
  name: "Card",
  components: {
    Raiting,
    Button,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const isInCart = ref(props.product.inCart);

    const addToCart = () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (isInCart.value) {
        isInCart.value = false;
        cart = cart.filter((item) => item !== props.product.id);
      } else {
        isInCart.value = true;
        cart.push(props.product.id);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    };

    onMounted(() => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart.includes(props.product.id)) {
        isInCart.value = true;
      }
    });

    return {
      isInCart,
      addToCart,
    };
  },
};
</script>

<template>
  <div class="product-card">
    <div class="product-card_image">
      <img :src="product.image" :alt="product.name" />
    </div>
    <div class="product-card_footer">
      <div class="product-card_cost">{{ product.cost }} ₽</div>
      <div>{{ product.name }}</div>
      <Raiting :starsSelected="product.raiting" :totalStars="5" />
      <Button :isOrange="isInCart" @click="addToCart"> В корзину </Button>
    </div>
  </div>
</template>
