<script lang="ts">
  import { page } from "$app/stores";
  import AnotherCompanies from "$lib/components/AnotherCompanies.svelte";
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
  <div class="card variant-glass-primary">
    <header class="card-header">
      <h1>{data.infoCompany.title}</h1>
    </header>
    <div class="p-4"></div>
    <footer class="card-footer">
      <address>
        <p>Адрес: {data.infoCompany.address}, {data.city.label}, {data.country.label}</p>
        <p>Телефон: <a href={`tel:${data.infoCompany.phone}`}>{data.infoCompany.phone}</a></p>
        <a href={data.infoCompany.href} target="_blank" rel="noopener noreferrer"
          >Открыть на google карте</a
        >
      </address>
    </footer>
  </div>
    <AnotherCompanies
      data={{
        anotherCompanies: data.anotherCompanies,
        anotherInfoCompanies: data.anotherInfoCompanies,
        country: data.country,
        city: data.city,
      }}
    />
</CenteredPage>
