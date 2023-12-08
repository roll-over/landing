<script>
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import Section from "$lib/components/Section.svelte";
  import SupportLink from "$lib/components/SupportLink.svelte";
</script>

<CenteredPage>
  <h1>Не выбрана компания для просмотра</h1>
  <Section>
    <h2 class="card-header w-full">Как выбрать компанию?</h2>
    <p class="p-4 w-full">Пожалуйста, выберите компанию в поиске для просмотра.</p>
    <footer class="card-footer w-full">
      <SupportLink href="/ru/search/">Перейти в поиск</SupportLink>
    </footer>
  </Section>
  <Section>
    <h2 class="card-header w-full">Как создать компанию?</h2>
    <p class="p-4 w-full">Если у вас нет компании, то создайте её в соответствующем разделе</p>
    <footer class="card-footer w-full">
      <SupportLink href="/ru/crm/create-company">Приступить к созданию компании!</SupportLink>.
    </footer>
  </Section>
</CenteredPage>
