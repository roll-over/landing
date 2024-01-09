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
  import CreateCompanyButton from "./CreateCompanyButton.svelte";
  $: l = localisation($page.params.lang);

  export let data: { company: Company; usersCompanies: Company[]; texts: string[] };
</script>

<svelte:head>
  <title>{l("CRM-система для стоматологий")}</title>
  <meta name="description" content={l("CRM-система для стоматологий")} />
</svelte:head>

<div class="flex w-full flex-col gap-5 p-2 md:gap-10 md:p-10">
  <h1>{l("CRM-система для стоматологий")}</h1>
  <slot />
  <Section>
    <div class="flex flex-col-reverse items-center justify-center gap-5 md:flex-row">
      <img src={Dantist1} class="h-96 w-96 rounded-xl" alt={l("Стоматолог в кресле")} />
      <div class="text-block flex flex-col justify-center gap-5 md:gap-10 md:p-10">
        <SvelteMarkdown source={data.texts[0]}></SvelteMarkdown>
        <CreateCompanyButton {data} />
      </div>
    </div>
  </Section>

  <Section>
    <div class="flex flex-col items-center justify-center gap-5 md:flex-row">
      <div class="text-block flex flex-col justify-center gap-5 md:gap-10 md:p-10">
        <SvelteMarkdown source={data.texts[1]}></SvelteMarkdown>

        <CreateCompanyButton {data} />
      </div>
      <img src={Dantist2} class="h-96 w-96 rounded-xl" alt={l("Стоматолог за компьютером")} />
    </div>
  </Section>

  <Section>
    <div class="flex flex-col-reverse items-center justify-center gap-5 md:flex-row">
      <img
        src={Dantist3}
        class="h-80 w-96 rounded-xl"
        alt={l("Девушка стоматолог за ноутбуком улыбается")}
      />
      <div class="text-block flex flex-col justify-center gap-5 md:gap-10 md:p-10">
        <SvelteMarkdown
          source={data.texts[2]}
          renderers={{
            heading: Heading,
            list: List,
          }}
        ></SvelteMarkdown>
        <CreateCompanyButton {data} />
      </div>
    </div>
  </Section>
</div>

<style>
  .text-block {
    max-width: 600px;
  }
</style>
