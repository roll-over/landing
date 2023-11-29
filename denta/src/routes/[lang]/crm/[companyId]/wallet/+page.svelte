<script lang="ts">
  import { page } from "$app/stores";
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import SupportLink from "$lib/components/SupportLink.svelte";

  export let data: {};
</script>

<CenteredPage>
  <h1>Кошелек</h1>
  <p>
    Баланс: {0} руб.
  </p>
  <p>
    Расход в этом месяце: {0} руб.
  </p>
  <p>
    Расход в день: {0} руб.
  </p>
  <p>
    Баланса хватит на {0} дней
  </p>

  <SupportLink href={`/${$page.params.lang}/crm/${$page.params.companyId}/top-up`}
    >Пополнить</SupportLink
  >
  <SupportLink href={`/${$page.params.lang}/crm/${$page.params.companyId}/transactions`}
    >История транзакций</SupportLink
  >
</CenteredPage>
