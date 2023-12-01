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
  class="btn variant-filled-warning w-14 h-14"
>
  <Icon src={ImCancelCircle} />
</button>
