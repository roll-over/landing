<script lang="ts">
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import { page } from "$app/stores";
  import { localisation } from "$lib/localisation/localisation";
  import SvelteMarkdown from "svelte-markdown";

  export let data: {
    source: string;
  };
  $: l = localisation($page.params.lang);
</script>

<svelte:head>
  <title>{l("О нас - Разработчики denta-crm")}</title>
  <meta name="description" content={l("О команде разработки CRM-системы для стоматологов")} />
</svelte:head>

<CenteredPage>
  <h1>{l("О нас - Разработчики denta-crm")}</h1>

  <SvelteMarkdown source={data.source} />

  <section>
    <h3>roll-over</h3>
    <p>
      {l("Сервис создан в гильдии открытых проектов")}
      <a href="https://roll-over.org/?utm_source=denta-crm.com">roll-over</a>
    </p>
  </section>
</CenteredPage>
