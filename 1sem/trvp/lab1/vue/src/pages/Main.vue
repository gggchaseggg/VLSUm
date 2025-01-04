<script>
import Goods from "../components/Goods.vue";
import { PRODUCTS_LIST } from "../data";

export default {
  name: "Main",
  components: {
    Goods,
  },
  setup() {
    return {
      productLists: PRODUCTS_LIST,
    };
  },
};
</script>

<template>
  <Goods :productLists="productLists" />
</template>
