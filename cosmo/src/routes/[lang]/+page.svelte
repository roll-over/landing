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
<ul class="flex w-full flex-col items-center justify-center gap-5 p-2 md:gap-10 md:p-5">
  <li class="planet_1">
    <a href={`https://denta-crm.com/${$page.params.lang}?utm_source=cosmo-crm.com`} class="">
      <header class="card-header">
        <h2 class="">🦷 Denta CRM</h2>
      </header>
      <div class="p-4">
        {l("CRM-система для стоматологий")}
      </div>
    </a>
  </li>
  <li class="planet_2">
    <a href={`https://femida-crm.com/${$page.params.lang}?utm_source=cosmo-crm.com`} class="">
      <header class="card-header">
        <h2 class="">⚖️ Femida CRM</h2>
      </header>
      <div class="p-4">
        {l("CRM-система для юристов")}
      </div>
    </a>
  </li>
</ul>

<style lang="scss">
  .p {
    width: 100%;
    max-width: 500px;
  }

  li {
    width: 100%;
    max-width: 450px;
    height: 120px;
    background: rgba(26, 129, 129, 0.595);
    border-radius: 16px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);

    transition: all 0.2s ease-in-out;
    a {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      text-decoration: none;
      color: inherit;
      text-align: right;
    }
    h2 {
      text-align: left;
    }
  }

  li:hover {
    border-width: 3px;
    box-shadow: 0 0 50px rgba(156, 156, 156, 0.5);
  }
</style>
