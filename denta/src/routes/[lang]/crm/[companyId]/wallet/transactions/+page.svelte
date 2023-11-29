<script lang="ts">
  import { page } from "$app/stores";
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import SupportLink from "$lib/components/SupportLink.svelte";

  export let data: {};
</script>

<CenteredPage>
  <h2>Транзакции</h2>
  <p>
    Всего пополнений: {0} руб.
  </p>
  <p>
    Всего расхода: {0} руб.
  </p>

  <SupportLink href={`/${$page.params.lang}/crm/${$page.params.companyId}/top-up`}
    >Пополнить</SupportLink
  >
</CenteredPage>
