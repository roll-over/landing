<script>
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import Section from "$lib/components/Section.svelte";
  import SupportLink from "$lib/components/SupportLink.svelte";
  import SelveteSeo from "svelte-seo";

  import { page } from "$app/stores";
  import { localisation } from "$lib/localisation/localisation";
  $: l = localisation($page.params.lang);
</script>

<SelveteSeo
  title={l("Не выбрана компания для просмотра")}
  description={l("Не выбрана компания для просмотра")}
/>

<CenteredPage>
  <h1>{l("Не выбрана компания для просмотра")}</h1>
  <Section>
    <h2 class="card-header w-full">{l("Как выбрать компанию?")}</h2>
    <p class="p-4 w-full">{l("Пожалуйста, выберите компанию в поиске для просмотра.")}</p>
    <footer class="card-footer w-full">
      <SupportLink href={`/${$page.params.lang}/search/`}>{l("Перейти в поиск")}</SupportLink>
    </footer>
  </Section>
  <Section>
    <h2 class="card-header w-full">{l("Как создать компанию?")}</h2>
    <p class="p-4 w-full">
      {l("Если у вас нет компании, то создайте её в соответствующем разделе")}
    </p>
    <footer class="card-footer w-full">
      <SupportLink href={`/${$page.params.lang}/crm/create-company`}
        >{l("Приступить к созданию компании!")}</SupportLink
      >.
    </footer>
  </Section>
</CenteredPage>
