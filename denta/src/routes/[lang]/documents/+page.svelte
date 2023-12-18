<script lang="ts">
  import SvelteSeo from "svelte-seo";
  import { page } from "$app/stores";
  import { localisation } from "$lib/localisation/localisation";
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  $: l = localisation($page.params.lang);
</script>

<SvelteSeo title={l("Нормативные документы")} description={l("Нормативные документы")} />

<CenteredPage>
  <h1 class="pb-2 text-6xl text-gray-900">{l("Документы")}</h1>
  <nav>
    <ul>
      <li>
        <a href={`/${$page.params.lang}/documents/cookie-policy`}
          >{l("Политика в отношении файлов cookie")}</a
        >
      </li>
      <li>
        <a href={`/${$page.params.lang}/documents/privacy-policy`}
          >{l("Политика конфиденциальности")}</a
        >
      </li>
      <li>
        <a href={`/${$page.params.lang}/documents/terms-of-service`}
          >{l("Пользовательское соглашение")}</a
        >
      </li>
    </ul>
  </nav>
</CenteredPage>
