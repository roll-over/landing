<script lang="ts">
  import { clickOutside } from "$lib/clickOutside";
  import NavLink from "$lib/components/NavLink.svelte";
  import SupportLink from "$lib/components/SupportLink.svelte";
  import type { Cabinet, Language } from "$lib/types/crm";
  import { page } from "$app/stores";

  import { localisation } from "$lib/localisation/localisation";
  import type { LocalisationData } from "$lib/localisation/dynamic-localisation";
  $: l = localisation($page.params.lang);

  export let data: {
    cabinets: {
      address: Cabinet["address"];
    }[];
    countries: { value: string; label: string }[];
    cities: { value: string; label: string }[];
    country: { value: string; label: string };
    city: { value: string; label: string };
    lang: Language;
    infoCompanies: {
      _id: string;
      title: string;
      address: string;
      phone: string;
      views: number;
    }[];
    localisation: LocalisationData;
  };

  $: pickingCountry = false;
  $: pickingCity = false;
</script>

<svelte:head>
  <title>{l("Поиск стоматологий в")} {data.city.label}, {data.country.label}</title>
  <meta
    name="description"
    content={`${l("Поиск стоматологий в")} ${data.city.label}, ${data.country.label}. ${
      data.infoCompanies
        .map((cabinet) => cabinet.title)
        .join(", ")
        .slice(0, 100) || ""
    }`}
  />
</svelte:head>

<div class="p-2 md:p-10 flex flex-col gap-16">
  <div class="flex flex-col w-full items-center">
    <h1>{l("Поиск стоматологий в")} {data.city.label}, {data.country.label}</h1>

    <nav class="flex flex-row flex-wrap gap-3 relative text-2xl p-3">
      <span>{l("Выберите страну и город:")}</span>
      <div class="relative">
        <button on:click={() => (pickingCountry = !pickingCountry)} class="btn variant-ghost">
          {data.country.label}
        </button>
        <ol
          class="card flex flex-col z-50 top-10 p-2 gap-2 default-bg {pickingCountry
            ? 'absolute'
            : 'hidden'}"
          use:clickOutside
          on:click_outside={() => (pickingCountry = false)}
        >
          {#each data.countries as country}
            {#if country.value !== data.country.value}
              <li class="card variant-glass-primary card-hover">
                <NavLink
                  href={`/${data.lang}/search/${country.value}`}
                  on:click={() => (pickingCountry = false)}
                >
                  {country.label}
                </NavLink>
              </li>
            {/if}
          {/each}
        </ol>
      </div>
      <div class="relative">
        <button on:click={() => (pickingCity = !pickingCity)} class="btn variant-ghost">
          {data.city.label}
        </button>
        <ol
          class="card flex flex-col z-50 top-10 p-2 gap-2 default-bg {pickingCity
            ? 'absolute'
            : 'hidden'}"
          use:clickOutside
          on:click_outside={() => (pickingCity = false)}
        >
          {#each data.cities as city}
            {#if city.value && city.value !== data.city.value}
              <li class="card variant-glass-primary card-hover">
                <NavLink
                  href={`/${data.lang}/search/${data.country.value}/${city.value}`}
                  on:click={() => (pickingCity = false)}
                >
                  {city.label}
                </NavLink>
              </li>
            {/if}
          {/each}
        </ol>
      </div>
    </nav>
  </div>

  {#if !data.infoCompanies.length}
    <div>
      <h2>{l("К сожалению, в этом городе мы не нашли стоматологий")}</h2>
      <p>{l("Попробуйте выбрать другой город")}</p>
    </div>
  {/if}

  <ul class="flex flex-row flex-wrap gap-10 justify-between">
    {#each data.infoCompanies as cabinet}
      <li
        class="card card-hover w-96 border-2 p-2 rounded-xl variant-glass-secondary flex flex-col justify-between"
      >
        <header class="card-header">
          <h2>{cabinet.title}</h2>
        </header>
        <div class="p-4">
          <p>{l("Адрес")}: {cabinet.address}</p>
          <p>
            {l("Телефон")}: <a href={`tel:${cabinet.phone.replaceAll(" ", "")}`}>{cabinet.phone}</a>
          </p>
        </div>
        <footer class="card-footer">
          <p>
            {data.localisation["Просмотров"]}: {cabinet.views || 0}
          </p>
          <SupportLink href={`/${data.lang}/company/${cabinet.publicId || cabinet._id}`}
            >{l("Подробнее")}</SupportLink
          >
        </footer>
      </li>
    {/each}
  </ul>
</div>
