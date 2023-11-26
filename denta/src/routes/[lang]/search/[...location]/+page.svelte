<script lang="ts">
  import { clickOutside } from "$lib/clickOutside";
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import NavLink from "$lib/components/NavLink.svelte";
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

<CenteredPage>
  <div class="flex flex-col">
    <h2>Поиск стоматологий в {data.country.label}</h2>

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
</CenteredPage>
