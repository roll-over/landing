<script lang="ts">
  import type { Company } from "$lib/types/crm";
  import { page } from "$app/stores";
  import { localisation } from "$lib/localisation/localisation";
  $: l = localisation($page.params.lang);

  export let data: { company: Company; companies: Company[]; texts: string[] };
</script>

{#if !data.companies?.length}
  <a href={`/${$page.params.lang}/crm/create-company`} class="btn variant-filled-primary">
    {l("Создать компанию!")}
  </a>
{/if}
