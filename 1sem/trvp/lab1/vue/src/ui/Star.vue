<script>
export default {
  name: "Star",
  props: {
    selected: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click"],
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
};
</script>

<template>
  <div :class="selected ? 'star selected' : 'star'" @click="handleClick"></div>
</template>
