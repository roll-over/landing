<script lang="ts">
  import AnotherCompanies from "$lib/components/AnotherCompanies.svelte";
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import type { Cabinet, Language } from "$lib/types/crm";
  import SvelteMarkdown from "svelte-markdown";

  export let data: {
    cabinets: {
      address: Cabinet["address"];
    }[];
    countries: { value: string; label: string }[];
    cities: { value: string; label: string }[];
    country: { value: string; label: string };
    city: { value: string; label: string };
    lang: Language;
    infoCompany: {
      title: string;
      description: string;
      address: string;
      phone: string;
      href: string;
    };
    anotherCompanies: {
      _id: string;
      title: string;
      address: string;
      phone: string;
    }[];
    anotherInfoCompanies: {
      _id: string;
      title: string;
      address: string;
      phone: string;
    }[];
  };
</script>

<svelte:head>
  <title>{data.infoCompany.title} в {data.city.label}, {data.country.label}</title>
  <meta
    name="description"
    content={`Стоматология ${data.infoCompany.title} в ${data.city.label}, ${data.country.label}. ${
      data.infoCompany.description?.slice(0, 100) || ""
    }`}
  />
</svelte:head>

<CenteredPage>
  <h1>{data.infoCompany.title}</h1>
  <div class="card variant-glass-primary">
    <header class="card-header">
      <h2>Информация о стоматологии</h2>
    </header>
    <div class="p-4">
      {#if data.infoCompany.description}
        <section>
          <h3>Описание:</h3>
          <SvelteMarkdown source={data.infoCompany.description} />
        </section>
      {/if}
    </div>
    <footer class="card-footer">
      <address>
        <p>Адрес: {data.infoCompany.address}, {data.city.label}, {data.country.label}</p>
        <p>
          Телефон: <a href={`tel:${data.infoCompany.phone.replaceAll(" ", "")}`}
            >{data.infoCompany.phone}</a
          >
        </p>
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
