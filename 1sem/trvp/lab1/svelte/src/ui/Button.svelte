<script>
  export let isOrange = false;
  export let onClick;
</script>

<button class="ui_Button {isOrange ? 'ui_Button-orange' : ''}" on:click={onClick}>
  <slot></slot>
</button>