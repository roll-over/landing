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
  class="variant-filled-primary btn flex h-14 flex-row items-center justify-center gap-2"
>
  <slot />
  <Icon {src} />
</button>
