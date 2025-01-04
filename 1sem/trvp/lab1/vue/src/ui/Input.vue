<script>
export default {
  name: "Input",
  props: {
    label: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    onChange: {
      type: Function,
      default: null,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleInput(event) {
      if (this.onChange) {
        this.onChange(event);
      }
    },
  },
};
</script>

<template>
  <label class="ui_input-label">
    <span>{{ label }}</span>
    <input
      class="ui_input-field"
      type="text"
      :value="value"
      @input="handleInput"
      :disabled="isDisabled"
    />
  </label>
</template>
