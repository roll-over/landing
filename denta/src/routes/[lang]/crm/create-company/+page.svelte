<script lang="ts">
  import { page } from "$app/stores";
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import Section from "$lib/components/Section.svelte";
  import type { Cabinet, City, Country, Language } from "$lib/types/crm";

  export let data: {
    countries: Country[];
    lang: Language;
  };

  $: name = null;
  $: country = null as Country | null;
  $: city = null;
  $: cities = [] as City[];
</script>

<CenteredPage>
  <h1>Создать команию</h1>
  <input
    type="text"
    placeholder="Название"
    bind:value={name}
    on:input={(e) => {
      name = e.target.value;
    }}
  />
  <Section>
    <h1>Расположение головного офиса или клиники (если одна)</h1>
    <p>На следующем шаге вы сможете добавить филиалы и кабинеты.</p>
    <input
      type="text"
      list="countries"
      placeholder="Страна"
      bind:value={country}
      on:input={(e) => {
        country = e.target.value;
      }}
      on:change={async () => {
        console.log(country);
        await fetch(
          `/${$page.params.lang}/location/${
            data.countries.find((c) => c.label === country)?.value
          }/cities/`,
        )
          .then((res) => res.json())
          .then((_data) => {
            console.log(_data);
            cities = _data;

            return _data;
          });
      }}
    />
    <datalist id="countries">
      {#each data.countries as country}
        <option value={country.label}>{country.label}</option>
      {/each}
    </datalist>

    <input
      type="text"
      list="cities"
      placeholder="Город"
      bind:value={city}
      on:input={(e) => {
        city = e.target.value;
      }}
    />

    <datalist id="cities">
      {#each cities as city}
        <option value={city.label}>{city.label}</option>
      {/each}
    </datalist>
  </Section>

  <button
    on:click={() => {
      console.log(cities);

      const company = {
        name,
        mainAddress: {
          country: data.countries.find((c) => c.label === country)?.value || country,
          city: cities?.find((c) => c.label === city)?.value || city,
        },
      };

      fetch("/ru/crm/new/company/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(company),
      })
        .then((res) => {
          return res.json();
        })
        .then((c) => {
          window.location.href = `/${$page.params.lang}/crm/${c.id}/company/`;
        }).catch((e) => {
          console.log(e);
          window.location.href = `/${$page.params.lang}/crm/`;
        });
    }}
  >
    Создать
  </button>
</CenteredPage>
