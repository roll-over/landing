<script>
  import { authAction } from "$lib/frontend/auth-action";
</script>

<button
  class="text-stone-700 hover:text-stone-500 hover:border-stone-600 p-2 flex justify-center"
  on:click={() => {
    authAction();
  }}
>
  <slot />
</button>
