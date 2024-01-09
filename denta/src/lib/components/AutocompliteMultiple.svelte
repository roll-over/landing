<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Icon from "svelte-icons-pack";
  import AiOutlineClose from "svelte-icons-pack/ai/AiOutlineClose";

  const dispatch = createEventDispatcher();

  export let datalist = [] as { value: string; label: string }[];
  export let values = [] as { value: string; label: string }[];
  export let id = "";

  const removeDublicates = (
    arr: { value: string; label: string }[],
  ): { value: string; label: string }[] => {
    const result = [];
    const map = new Map();
    for (const item of arr) {
      if (!map.has(item.value)) {
        map.set(item.value, true);
        result.push(item);
      }
    }
    return result;
  };

  $: label = "";
</script>

<div class="flex flex-wrap gap-5">
  {#each values as value}
    <button
      class="variant-soft chip rounded-lg hover:variant-filled"
      on:click={() => {
        values = values.filter((item) => item.label !== value.label);
        dispatch("change", values);
      }}
    >
      <span>
        <Icon src={AiOutlineClose} />
      </span>
      <span>{value.label}</span>
    </button>
  {/each}
</div>

<input
  type="text"
  list={id}
  bind:value={label}
  on:change={(e) => {
    values = [...values, datalist.find((item) => item.label === e.target.value)];
    values = removeDublicates(values);
    dispatch("change", values);
    label = "";
  }}
/>
<datalist {id}>
  {#each datalist as item}
    <option value={item.label}>{item.label}</option>
  {/each}
</datalist>
