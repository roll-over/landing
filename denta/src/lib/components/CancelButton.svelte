<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Icon from "svelte-icons-pack";
  import ImCancelCircle from "svelte-icons-pack/im/ImCancelCircle";
  const dispatch = createEventDispatcher();
</script>

<button
  on:click={(e) => {
    dispatch("click", e);
  }}
  class="variant-filled-warning btn h-14 w-14"
>
  <Icon src={ImCancelCircle} />
</button>
