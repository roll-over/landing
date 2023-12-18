<script>
  export let ordered = false;
</script>

{#if ordered}
  <ul class="list-decimal pl-10 flex flex-col gap-5">
    {#each $$props.items as item}
      <li>{item.text}</li>
    {/each}
  </ul>
{:else}
  <ol class="list-disc pl-10 flex flex-col gap-5">
    {#each $$props.items as item}
      <li>{item.text}</li>
    {/each}
  </ol>
{/if}
