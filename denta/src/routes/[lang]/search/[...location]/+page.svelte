<script lang="ts">
  import { clickOutside } from "$lib/clickOutside";
  import NavLink from "$lib/components/NavLink.svelte";
  import SupportLink from "$lib/components/SupportLink.svelte";
  import type { Cabinet, Language } from "$lib/types/crm";

  export let data: {
    cabinets: {
      address: Cabinet["address"];
    }[];
    countries: { value: string; label: string }[];
    cities: { value: string; label: string }[];
    country: { value: string; label: string };
    city: { value: string; label: string };
    lang: Language;
  };

  $: pickingCountry = false;
  $: pickingCity = false;
</script>

<svelte:head>
  <title>Поиск стоматологий в {data.city.label}, {data.country.label}</title>
  <meta
    name="description"
    content={`Поиск стоматологий в ${data.city.label}, ${data.country.label}`}
  />
</svelte:head>

<div class="p-2 md:p-10 flex flex-col gap-16">
  <div class="flex flex-col w-full items-center">
    <h1>Поиск стоматологий в {data.city.label}, {data.country.label}</h1>

    <div class="flex flex-row gap-3">
      <button on:click={() => (pickingCountry = !pickingCountry)}>
        {data.country.label},
        <ol
          class="flex flex-col border-2 border-gray-400 rounded-2xl p-2 gap-2 text-grey-800 {pickingCountry
            ? 'absolute'
            : 'hidden'}"
          use:clickOutside
          on:click_outside={() => (pickingCountry = false)}
        >
          {#each data.countries as country}
            <li class="border-2 border-gray-400 rounded-xl">
              <NavLink href={`/${data.lang}/search/${country.value}`}>
                {country.label}
              </NavLink>
            </li>
          {/each}
        </ol>
      </button>
      <button on:click={() => (pickingCity = !pickingCity)}>
        {data.city.label}
        <ol
          class=" flex flex-col border-2 border-gray-400 rounded-2xl p-2 gap-2 text-grey-800 {pickingCity
            ? 'absolute'
            : 'hidden'}"
          use:clickOutside
          on:click_outside={() => (pickingCity = false)}
        >
          {#each data.cities as city}
            <li>
              <NavLink href={`/${data.lang}/search/${data.country.value}/${city.value}`}>
                {city.label}
              </NavLink>
            </li>
          {/each}
        </ol>
      </button>
    </div>
  </div>

  <ul class="flex flex-row flex-wrap gap-10 justify-between">
    {#each data.infoCompanies as cabinet}
      <li class="flex flex-col justify-between gap-2 w-96 border-2 p-2 rounded-xl">
        <h3>{cabinet.title}</h3>
        <p>Адрес: {cabinet.address}</p>
        <p>Телефон: <a href={`tel:${cabinet.phone}`} >{cabinet.phone}</a></p>
        <SupportLink href={`/${data.lang}/company/${cabinet._id}/`}>Подробнее</SupportLink>
      </li>
    {/each}
  </ul>
</div>
