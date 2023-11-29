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
  class="btn variant-filled-warning"
>
  <Icon src={AiOutlineDelete} />
</button>
