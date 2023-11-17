<script>
  import NavLink from "$lib/components/NavLink.svelte";
  import CenteredPage from "$lib/components/blocks/CenteredPage.svelte";
</script>

<CenteredPage title="Admin panel">
  <ul>
    <li>
      <NavLink href="/admin/admins">Администраторы</NavLink>
    </li>
    <li>
      <NavLink href="/admin/articles">Статьи</NavLink>
    </li>
  </ul>
</CenteredPage>
