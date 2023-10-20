<script>
  export let text = "";
  export let depth = 2;
</script>

{#if depth === 1}
  <h3 class="text-2xl font-semibold">{text}</h3>
{:else if depth === 2}
  <h4 class="text-xl font-semibold">{text}</h4>
{:else if depth === 3}
  <h5 class="text-lg font-semibold">{text}</h5>
{:else}
  <h6 class="text-ms font-semibold">{text}</h6>
{/if}
