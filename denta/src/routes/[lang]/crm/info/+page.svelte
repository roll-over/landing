<script lang="ts">
  import Section from "$lib/components/Section.svelte";
  import type { Company } from "$lib/types/crm";
  import Dantist1 from "$lib/assets/crm-pictures/0_3.webp";
  import Dantist2 from "$lib/assets/crm-pictures/0_2.webp";
  import Dantist3 from "$lib/assets/crm-pictures/0_0.webp";
  import Heading from "$lib/components/markdown/Heading.svelte";
  import List from "$lib/components/markdown/List.svelte";
  import { page } from "$app/stores";
  import { localisation } from "$lib/localisation/localisation";
  import SvelteMarkdown from "svelte-markdown";
  $: l = localisation($page.params.lang);

  export let data: { company: Company; companies: Company[]; texts: string[] };
</script>

<svelte:head>
  <title>{l("CRM-система для стоматологий")}</title>
  <meta name="description" content={l("CRM-система для стоматологий")} />
</svelte:head>

<div class="flex flex-col p-2 md:p-10 w-full gap-5 md:gap-10">
  <h1>{l("CRM-система для стоматологий")}</h1>
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

  <Section>
    <div class="flex gap-5 justify-center items-center flex-col-reverse md:flex-row">
      <img src={Dantist1} class="w-96 h-96 rounded-xl" alt={l("Стоматолог в кресле")} />
      <div class="flex flex-col md:p-10 gap-5 md:gap-10 justify-center text-block">
        <SvelteMarkdown source={data.texts[0]}></SvelteMarkdown>
        {#if !data.companies?.length}
          <a href={`/${$page.params.lang}/crm/create-company`} class="btn variant-filled-primary">
            {l("Создать компанию!")}
          </a>
        {/if}
      </div>
    </div>
  </Section>

  <Section>
    <div class="flex gap-5 justify-center items-center flex-col md:flex-row">
      <div class="flex flex-col md:p-10 gap-5 md:gap-10 justify-center text-block">
        <SvelteMarkdown source={data.texts[1]}></SvelteMarkdown>

        {#if !data.companies?.length}
          <a href={`/${$page.params.lang}/crm/create-company`} class="btn variant-filled-primary">
            {l("Создать компанию!")}
          </a>
        {/if}
      </div>
      <img src={Dantist2} class="w-96 h-96 rounded-xl" alt={l("Стоматолог за компьютером")} />
    </div>
  </Section>

  <Section>
    <div class="flex gap-5 justify-center items-center flex-col-reverse md:flex-row">
      <img
        src={Dantist3}
        class="w-96 h-80 rounded-xl"
        alt={l("Девушка стоматолог за ноутбуком улыбается")}
      />
      <div class="flex flex-col md:p-10 gap-5 md:gap-10 justify-center text-block">
        <SvelteMarkdown
          source={data.texts[2]}
          renderers={{
            heading: Heading,
            list: List,
          }}
        ></SvelteMarkdown>

        {#if !data.companies?.length}
          <a href={`/${$page.params.lang}/crm/create-company`} class="btn variant-filled-primary">
            {l("Создать компанию!")}
          </a>
        {/if}
      </div>
    </div>
  </Section>
</div>

<style>
  .text-block {
    max-width: 600px;
  }
</style>
