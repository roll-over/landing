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
    <li>
      <NavLink href="/admin/support">Поддержка</NavLink>
    </li>

    <li>
      <NavLink href="/apps/preview-generator">Preview generator</NavLink>
    </li>

    <li>
      <NavLink href="/admin/anounces">Анонсы</NavLink>
    </li>

    <li>
      <NavLink href="/admin/timecodes-generator">timecodes-generator</NavLink>
    </li>
  </ul>
</CenteredPage>
