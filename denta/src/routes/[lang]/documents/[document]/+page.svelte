<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import SvelteSeo from "svelte-seo";
  import { localisation } from "$lib/localisation/localisation";

  export let data: {
    documents: any[];
  };

  $: l = localisation($page.params.lang);
  $: if (!data.documents.map((x) => x.id).includes($page.params.document)) {
    goto("/data.documents");
  }
</script>

<SvelteSeo
  title={`${data.documents.find((item) => item.id === $page.params.document)?.label}: ${l(
    "Нормативные документы",
  )}`}
  description={`${data.documents.find((item) => item.id === $page.params.document)?.label}: ${l(
    "Нормативные документы",
  )}`}
/>
<div class="flex flex-col items-center justify-center">
  <div class="doc">
    <a href={`/${$page.params.lang}/documents`}>{l("Обратно к документам")}</a>
    <h1>{data.documents.find((item) => item.id === $page.params.document)?.label}</h1>
    <iframe
      title="cookie policy"
      width="100%"
      height="100%"
      class="min-h-screen"
      src={data.documents.find((item) => item.id === $page.params.document).document}
    ></iframe>
  </div>
</div>

<style>
  .doc {
    width: 100%;
    max-width: 700px;
    height: 100%;
    min-height: 100vh;
  }
</style>
