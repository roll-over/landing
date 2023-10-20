<script>
  export let text = "";
  export let depth = 2;
</script>

{#if depth === 1}
  <h3 class="text-xl font-semibold">{text}</h3>
{:else if depth === 2}
  <h4 class="text-lg font-semibold">{text}</h4>
{:else}
  <h5 class="font-semibold">{text}</h5>
{/if}
