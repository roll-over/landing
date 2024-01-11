<script>
  import SvelteSeo from "svelte-seo";
  import { page } from "$app/stores";
  import { localisation } from "$lib/localisation/localisation";
  $: l = localisation($page.params.lang);
</script>

<SvelteSeo
  title={l("Созвездие CRM-систем")}
  description={l(
    "Созвездие CRM-систем — это сервис, где вы можете найти подходящую CRM-систему для вашего бизнеса.",
  )}
/>

<div class="flex flex-col items-center justify-center">
  <h1>{l("Созвездие CRM-систем")}</h1>

  <p class="p p-4">
    {l(
      "Созвездие CRM-систем — это сервис, где вы можете найти подходящую CRM-систему для вашего бизнеса.",
    )}
  </p>
</div>
<ul class="flex flex-col p-2 md:p-5 gap-5 md:gap-10 justify-center items-center w-full">
  <li>
    <a href={`https://denta-crm.com/${$page.params.lang}?utm_source=cosmo-crm.com`} class="card">
      <header class="card-header">
        <h2 class="">Denta CRM</h2>
      </header>
      <div class="p-4">
        {l("CRM-система для стоматологий")}
      </div>
    </a>
  </li>
  <li>
    <a href={`https://femida-crm.com/${$page.params.lang}?utm_source=cosmo-crm.com`} class="card">
      <header class="card-header">
        <h2 class="">Femida CRM</h2>
      </header>
      <div class="p-4">
        {l("CRM-система для юристов")}
      </div>
    </a>
  </li>
</ul>

<style>
  .p {
    width: 100%;
    max-width: 500px;
  }

  li {
    width: 100%;
    max-width: 500px;
    background: rgba(255, 255, 255, 0.474);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
</style>
