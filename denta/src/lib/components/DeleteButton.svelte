<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Icon from "svelte-icons-pack";
  import AiOutlineDelete from "svelte-icons-pack/ai/AiOutlineDelete";

  const dispatch = createEventDispatcher();
</script>

<button
  on:click={(e) => {
    dispatch("click", e);
  }}
  class="btn variant-filled-warning w-14 h-14"
>
  <Icon src={AiOutlineDelete} />
</button>
