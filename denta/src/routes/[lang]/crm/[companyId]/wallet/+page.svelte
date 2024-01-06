<script lang="ts">
  import { page } from "$app/stores";
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import SupportLink from "$lib/components/SupportLink.svelte";

  export let data: {};
</script>

<CenteredPage>
  <div class="flex flex-col justify-center gap-5">
  <h1 class="text-center">Кошелек</h1>
  <p>
    Баланс: <span class="font-bold">{0} руб.</span>
  </p>
  <p>
    Расход в этом месяце: <span class="font-bold">{0} руб.</span>
  </p>
  <p>
    Расход в день: <span class="font-bold">{0} руб.</span>
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
  </div>

</CenteredPage>
