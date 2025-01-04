<script lang="ts">
  export let label = "";
  export let value = "";
  export let isDisabled = false;

  const handleChange = (event: any) => {
    value = event.target!.value;
  };
</script>

<label class="ui_input-label">
  <span>{label}</span>
  <input
    class="ui_input-field"
    type="text"
    bind:value
    on:input={handleChange}
    disabled={isDisabled}
  />
</label>
