<script>
  import NavLink from "$lib/components/NavLink.svelte";
  import { collections } from "$lib/collections";
  import CenteredPage from "$lib/components/blocks/CenteredPage.svelte";
</script>

<CenteredPage title="Articles">
  <ul>
    {#each Object.keys(collections) as collection}
      {#if collection !== "admins"}
        <li>
          <NavLink href={`/admin/articles/${collection}`}>{collection}</NavLink>
        </li>
      {/if}
    {/each}
  </ul>
</CenteredPage>
