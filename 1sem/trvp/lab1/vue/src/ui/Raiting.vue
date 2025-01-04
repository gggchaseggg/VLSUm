<script>
import { ref } from "vue";
import Star from "./Star.vue";

export default {
  name: "Rating",
  components: {
    Star,
  },
  props: {
    starsSelected: {
      type: Number,
      required: true,
    },
    totalStars: {
      type: Number,
      default: 5,
    },
    onRate: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const stars = ref(props.starsSelected);

    const clickStar = (i) => {
      props.onRate(i + 1);
      stars.value = i + 1;
    };

    return {
      stars,
      clickStar,
    };
  },
};
</script>

<template>
  <div class="star-rating">
    <Star
      v-for="(n, i) in totalStars"
      :key="i"
      :selected="i < stars"
      @click="clickStar(i)"
    />
  </div>
</template>
