<script lang="ts">
  import type { Company } from "$lib/types/crm";
  import { page } from "$app/stores";
  import { localisation } from "$lib/localisation/localisation";
  $: l = localisation($page.params.lang);

  export let data: { company: Company; usersCompanies: Company[]; texts: string[] };
</script>

{#if !data.usersCompanies?.length}
  <a href={`/${$page.params.lang}/crm/create-company`} class="variant-filled-primary btn">
    {l("Создать компанию!")}
  </a>
{/if}
