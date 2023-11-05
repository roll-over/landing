<script>
  import NavLink from "$lib/components/NavLink.svelte";
  import { collections } from "$lib/collections";
</script>

<h1>Admin panel</h1>
<ul>
  {#each Object.keys(collections) as collection}
    {#if collection !== "admins"}
      <li>
        <NavLink href={`/admin/articles/${collection}`}>{collection}</NavLink>
      </li>
    {/if}
  {/each}
</ul>
