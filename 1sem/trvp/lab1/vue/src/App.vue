<script>
import { onMounted } from "vue";

export default {
  name: "App",
  setup() {
    onMounted(() => {
      const cart = localStorage.getItem("cart");
      if (!cart) localStorage.setItem("cart", JSON.stringify([]));
    });
  },
};
</script>

<template>
  <router-view />
</template>
