<script>
import Card from "./Card.vue";

export default {
  name: "Goods",
  components: {
    Card,
  },
  props: {
    productLists: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <div v-for="list in productLists" :key="list.title" class="goods">
    <h3 class="goods_title">{{ list.title }}</h3>
    <div class="goods_products">
      <Card
        v-for="product in list.products"
        :key="product.name + product.cost"
        :product="product"
      />
    </div>
  </div>
</template>
