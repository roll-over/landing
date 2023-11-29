<script lang="ts">
  import { page } from "$app/stores";
  import CenteredPage from "$lib/components/CenteredPage.svelte";
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
</script>

<svelte:head>
  <title>Поиск стоматологий в {data.city.label}, {data.country.label}</title>
  <meta
    name="description"
    content={`Поиск стоматологий в ${data.city.label}, ${data.country.label}`}
  />
</svelte:head>

<CenteredPage>
  <div class="flex flex-col">
    <h1>Стоматология в {data.city.label}, {data.country.label}</h1>
  </div>

  <div class="flex flex-col gap-2">
    <h3>{data.infoCompany.title}</h3>
    <p>Адрес: {data.infoCompany.address}</p>
    <p>Телефон: <a href={`tel:${data.infoCompany.phone}`}>{data.infoCompany.phone}</a></p>

    <a href={data.infoCompany.href} target="_blank" rel="noopener noreferrer"
      >Открыть на google карте</a
    >
  </div>
  <br />
  <ul class="flex flex-col gap-5">
    <h1>Смотрите так-же:</h1>
    {#each data.anotherCompanies as cabinet}
      <li>
        <a
          href={`/${$page.params.lang}/company/${cabinet._id}/`}
          class=" flex flex-col justify-between gap-2"
        >
          <h3>{cabinet.title}</h3>
          <p>Адрес: {cabinet.address}</p></a
        >
      </li>
    {/each}
  </ul>
</CenteredPage>
