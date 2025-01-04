<script>
import { RouterLink, RouterView } from "vue-router";
import Button from "./Button.vue";

export default {
  name: "Layout",
  components: {
    RouterLink,
    RouterView,
    Button,
  },
};
</script>

<template>
  <div>
    <header>
      <RouterLink to="/">СЕВЕРЯНОЧКА</RouterLink>

      <RouterLink to="/cart">
        <Button isOrange>Корзина</Button>
      </RouterLink>
    </header>

    <main>
      <RouterView />
    </main>

    <footer>footer</footer>
  </div>
</template>
