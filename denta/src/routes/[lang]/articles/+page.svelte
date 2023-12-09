<script>
  import CenteredPage from "$lib/components/CenteredPage.svelte";
</script>

<svelte:head>
    <title>Статьи на denta-crm</title>
    <meta name="description" content="Разделы профессиональных статей на denta-crm" />
</svelte:head>

<CenteredPage>
  <h1>Разделы статей на denta-crm</h1>

  <ul class="list">
    <li>
      <a class="card p-4 variant-filled-primary" href="/ru/articles/crm">Статьи про crm системы для стоматологий</a>
    </li>
    <li>
      <a href="/ru/articles/services" class="card p-4 variant-filled-primary">Статьи про услуги в стоматологиях</a>
    </li>
  </ul>
</CenteredPage>
