<script lang="ts">
  import Section from "$lib/components/Section.svelte";
  import type { Company } from "$lib/types/crm";
  import { page } from "$app/stores";
  import { localisation } from "$lib/localisation/localisation";
  import Denta from "./Denta.svelte";
  import Femida from "./Femida.svelte";
  import { getAppName } from "$lib/app_name";
  $: l = localisation($page.params.lang);

  export let data: { company: Company; companies: Company[]; texts: string[] };

  const Component = {
    denta: Denta,
    femida: Femida,
  }[getAppName()];
</script>

<Component {data}>
  <Section>
    <div class="w-full flex justify-center">
      <div class="flex flex-col gap-5 w-96">
        <h2>{l("Ваши компании")}</h2>
        {#if !data.companies?.length}
          <p>{l("Ой, кажется у вас до сих пор не создана компания")}</p>
        {:else}
          <ol class="flex flex-col gap-10">
            {#each data.companies as company}
              <li>
                <a
                  class="border-2 border-gray-400 rounded-xl px-5 py-2"
                  href={`/${$page.params.lang}/crm/${company.id}/company`}>{company.name} -></a
                >
              </li>
            {/each}
          </ol>
        {/if}
      </div>
    </div>
  </Section>
</Component>
