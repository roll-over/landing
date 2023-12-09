<script>
  export let text = "";
  export let depth = 2;
</script>

{#if depth === 2}
  <h2 class="text-lg font-semibold">{text}</h2>
{:else if depth === 3}
  <h3 class="font-semibold">{text}</h3>
{:else if depth === 4}
  <h4 class="font-semibold">{text}</h4>
{:else if depth === 5}
  <h5 class="font-semibold">{text}</h5>
{:else if depth === 6}
  <h6 class="font-semibold">{text}</h6>
{/if}
