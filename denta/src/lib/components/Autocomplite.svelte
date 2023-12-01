<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let datalist = [] as { value: string; label: string }[];
  export let value = { value: "", label: "" };
  export let id = "";

  $: label = value?.label || "";
</script>

<input
  type="text"
  list={id}
  value={label}
  on:input={(e) => {}}
  on:change={(e) => {
    value = datalist.find((item) => item.label === e.target.value) || {
      value: "",
      label: "",
    };

    dispatch("change", value);
  }}
/>
<datalist {id}>
  {#each datalist as item}
    <option value={item.label}>{item.label}</option>
  {/each}
</datalist>
