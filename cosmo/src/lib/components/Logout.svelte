<script>
  import { logoutAction } from "$lib/frontend/auth-action";
</script>

<button
  class="flex justify-center p-2 text-stone-700 hover:border-stone-600 hover:text-stone-500"
  on:click={() => {
    logoutAction();
  }}
>
  <slot />
</button>
