<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<button
  on:click={(e) => {
    dispatch("click", e);
  }}
  class="flex flex-col bg-green-600 rounded-2xl p-5 gap-5 text-white items-center"
>
  <slot />
</button>
