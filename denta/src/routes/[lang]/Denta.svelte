<script>
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import Section from "$lib/components/Section.svelte";
  import { page } from "$app/stores";
  import { localisation } from "$lib/localisation/localisation";
  $: l = localisation($page.params.lang);
</script>

<svelte:head>
  <title>
    {l("Что такое denta-crm - CRM система для стоматологий?")}
  </title>
  <meta
    name="description"
    content={l(
      "Система управления стоматологической клиникой, создание сайта для стоматологии и поиск клиник.",
    )}
  />

  <meta property="og:title" content={l("Что такое denta-crm - CRM система для стоматологий?")} />
  <meta property="og:description" content={l("Система управления стоматологической клиникой")} />
</svelte:head>

<CenteredPage>
  <h1>{l("denta-crm")}</h1>
  <p>{l("Система управления стоматологической клиникой")}</p>

  <Section>
    <h2>{l("Что такое denta-crm?")}</h2>
    <p>
      {l(
        "denta-crm - это система управления стоматологической клиникой, которая позволяет вам управлять клиникой, а также взаимодействовать с пациентами.",
      )}
    </p>
  </Section>

  <Section>
    <h2>{l("denta-crm - это больше чем crm")}</h2>
    <p>
      {l(
        "denta-crm - это еще и система создания сайтов для стоматологических клиник, которая позволяет вам создать сайт для вашей клиники, а также взаимодействовать с пациентами.",
      )}
    </p>
    <a href={`/${$page.params.lang}/crm/create-company`}>{l("Создать компанию")}</a>
  </Section>

  <Section>
    <h2>{l("Какие возможности есть в denta-crm?")}</h2>
    <p>
      {l(
        "denta-crm позволяет вам управлять клиникой, а также взаимодействовать с пациентами. В denta-crm есть следующие возможности:",
      )}
    </p>
    <ul>
      <li>{l("Управление клиникой")}</li>
      <li>
        {l("Взаимодействие с пациентами")}
      </li>
      <li>
        {l("Создание сайта для клиники")}
      </li>
    </ul>
  </Section>

  <Section>
    <h2>
      {l("denta-crm - это база всех стоматологических клиник, которые есть в мире.")}
    </h2>

    <p>
      {l("Найти клинику в denta-crm можно в разделе")}
      <a href={`/${$page.params.lang}/search/`}>{l("поиск")}</a>
    </p>
  </Section>
</CenteredPage>
