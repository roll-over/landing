<script>
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import { page } from "$app/stores";
  import { localisation } from "$lib/localisation/localisation";
  $: l = localisation($page.params.lang);
</script>

<svelte:head>
  <title>{l("Статьи на denta-crm")}</title>
  <meta name="description" content={l("Разделы профессиональных статей на denta-crm")} />
</svelte:head>

<CenteredPage>
  <h1>{l("Разделы статей на denta-crm")}</h1>

  <ul class="list">
    <li>
      <a class="card variant-filled-primary p-4" href={`/${$page.params.lang}/articles/crm`}
        >{l("Статьи про crm системы для стоматологий")}</a
      >
    </li>
    <li>
      <a href={`/${$page.params.lang}/articles/services`} class="card variant-filled-primary p-4"
        >{l("Статьи про услуги в стоматологиях")}</a
      >
    </li>
  </ul>
</CenteredPage>
