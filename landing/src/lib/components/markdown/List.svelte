<script>
  export let ordered = false;
</script>

{#if ordered}
  <ul class="flex list-decimal flex-col gap-5 pl-10">
    {#each $$props.items as item}
      <li>{item.text}</li>
    {/each}
  </ul>
{:else}
  <ol class="flex list-disc flex-col gap-5 pl-10">
    {#each $$props.items as item}
      <li>{item.text}</li>
    {/each}
  </ol>
{/if}
