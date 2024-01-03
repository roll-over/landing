<script>
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import Section from "$lib/components/Section.svelte";
  import { page } from "$app/stores";
  import { localisation } from "$lib/localisation/localisation";
  $: l = localisation($page.params.lang);

  export let data;
</script>

<svelte:head>
  <title>
    {l("Что такое femida-crm - CRM система для юридических компаний?")}
  </title>
  <meta
    name="description"
    content={l(
      "Система управления юридической компанией, создание сайта для юридической компании и поиск юридических компаний.",
    )}
  />

  <meta
    property="og:title"
    content={l("Что такое femida-crm - CRM система для юридических компаний?")}
  />
  <meta
    property="og:description"
    content={l(
      "Система управления юридической компанией, создание сайта для юридической компании и поиск юридических компаний.",
    )}
  />
</svelte:head>

<CenteredPage>
  <h1>{l("femida-crm")}</h1>
  <p>{data.localisation["Система управления юридической компанией"]}</p>

  <Section>
    <h2>{l("Что такое femida-crm?")}</h2>
    <p>
      {data.localisation[
        "femida-crm - это система управления юридической компанией, которая позволяет вам управлять организацией, а также взаимодействовать с клиентами."
      ]}
    </p>
    <a href={`/${$page.params.lang}/crm/create-company`}>{l("Создать компанию")}</a>
  </Section>
</CenteredPage>
