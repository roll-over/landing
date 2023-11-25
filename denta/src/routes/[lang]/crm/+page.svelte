<script lang="ts">
  import type { Company } from "$lib/types/crm";
  export let data: { company: Company; companies: Company[] };
</script>

<div class="flex flex-col items-start">
  {#each data.companies as company}
    <a href={`/ru/crm/${company.id}/company`}>{company.name}</a>
  {/each}

  <a href="/ru/crm/create-company">Создать компанию</a>
</div>
