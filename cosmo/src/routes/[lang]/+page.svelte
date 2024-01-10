<script>
  import SvelteSeo from "svelte-seo";
  import { page } from "$app/stores";
</script>

<SvelteSeo title="Созвездие CRM-систем" />

<div class="flex flex-col justify-center items-center">
  <h1>Созвездие CRM-систем</h1>

  <p class="p p-4">
    Созвездие CRM-систем — это сервис, где вы можете найти подходящую CRM-систему для вашего
    бизнеса.
  </p>
</div>

<ul>
  <li>
    <a href={`https://denta-crm.com/${$page.params.lang}?utm_source=cosmo-crm.com`}>
      Denta CRM - CRM-система для стоматологий
    </a>
  </li>
  <li>
    <a href={`https://femida-crm.com/${$page.params.lang}?utm_source=cosmo-crm.com`}>
      Femida CRM - CRM-система для юристов
    </a>
  </li>
</ul>

<style>
  .p {
    width: 100%;
    max-width: 500px;
  }
</style>
