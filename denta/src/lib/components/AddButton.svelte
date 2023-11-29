<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Icon from "svelte-icons-pack";
  import RiSystemAddFill from "svelte-icons-pack/ri/RiSystemAddFill";

  const dispatch = createEventDispatcher();

  export let src = RiSystemAddFill;
</script>

<button
  on:click={(e) => {
    dispatch("click", e);
  }}
  class="btn variant-filled-primary w-14 h-14"
>
  <Icon {src} />
</button>
