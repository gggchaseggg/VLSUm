<script>
export default {
  name: "Button",
  props: {
    isOrange: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function,
      default: null,
    },
  },
  methods: {
    handleClick(event) {
      if (this.onClick) {
        this.onClick(event);
      }
    },
  },
};
</script>

<template>
  <button
    :class="['ui_Button', { 'ui_Button-orange': isOrange }]"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>
