<script>
import { ref, onMounted } from "vue";
import Card from "../components/Card.vue";
import Form from "../components/Form.vue";
import { PRODUCTS_LIST } from "../data";

export default {
  name: "Cart",
  components: {
    Card,
    Form,
  },
  setup() {
    const cart = ref([]);
    const cartItems = ref([]);

    const loadCart = () => {
      cart.value = JSON.parse(localStorage.getItem("cart") || "[]");

      let allProducts = [];
      PRODUCTS_LIST.forEach(({ products }) => {
        allProducts.push(...products);
      });

      cartItems.value = allProducts.filter(({ id }) => cart.value.includes(id));
    };

    onMounted(() => {
      loadCart();
    });

    return {
      cartItems,
    };
  },
};
</script>

<template>
  <div class="cart">
    <div class="cart_products">
      <Card v-for="product in cartItems" :key="product.id" :product="product" />
    </div>
    <div class="cart_delivery">
      <Form />
    </div>
  </div>
</template>
