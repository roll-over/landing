<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import FiSave from "svelte-icons-pack/fi/FiSave";
  import Icon from "svelte-icons-pack/Icon.svelte";

  const dispatch = createEventDispatcher();
</script>

<button
  on:click={(e) => {
    dispatch("click", e);
  }}
  class="btn variant-filled-secondary w-14 h-14"
>
  <Icon src={FiSave} />
</button>
