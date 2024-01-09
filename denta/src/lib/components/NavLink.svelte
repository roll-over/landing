<script>
  import { createEventDispatcher } from "svelte";

  export { href, ariaLabel };
  let href = "";
  let ariaLabel = "";
  const dispatch = createEventDispatcher();
</script>

<a
  {href}
  aria-label={ariaLabel}
  class="flex justify-center p-2 text-stone-700 hover:border-stone-600 hover:text-stone-500"
  on:click={(e) => {
    dispatch("click", e);
  }}
>
  <slot />
</a>
