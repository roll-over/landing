<script lang="ts">
  import AnotherCompanies from "$lib/components/AnotherCompanies.svelte";
  import type { Cabinet, Language } from "$lib/types/crm";
  import SvelteSeo from "svelte-seo";

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
      name: string;
      description: string;
      mainAddress: {
        street: string;
        house: string;
      };
      contacts: {
        type: "phone" | "email" | "website";
        value: string;
      }[];
      languagesIds: string[];
    };
  };
</script>

<SvelteSeo
  title={`${data.infoCompany.name} в ${data.city.label}, ${data.country.label}`}
  description={`Стоматология ${data.infoCompany.name} в ${data.city.label}, ${
    data.country.label
  }. ${data.infoCompany.description?.slice(0, 100) || ""}`}
  jsonLd={{
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: `${data.infoCompany.name}`,
    description: `${data.infoCompany.description}`,
    telephone: `${data.infoCompany.contacts?.find((c) => c.type === "phone")?.value}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: `${data.city.label}`,
      addressCountry: `${data.country.label}`,
      streetAddress: `${data.infoCompany.mainAddress.street}, ${data.infoCompany.mainAddress.house}`,
    },
    paymentAccepted: "Cash, Credit Card",
    priceRange: "$$",
  }}
></SvelteSeo>

<div class="flex flex-col items-center justify-center p-2">
  <div class="page flex flex-col gap-14">
    <div class="card variant-glass-primary flex flex-col gap-14">
      <header class="card-header">
        <h1>{data.infoCompany.name}</h1>
      </header>
      <div class="p-4">
        {#if data.infoCompany.description}
          <section>
            <h2>Описание:</h2>
            <p>{data.infoCompany.description}</p>
          </section>
        {/if}

        {#if data.infoCompany.languagesIds?.length}
          <section>
            <h2>Языки приёма:</h2>
            <ul class="flex gap-4">
              {#each data.infoCompany.languagesIds as id}
                <li>
                  <p class="variant-filled-primary chip">
                    {data.languages.find((l) => l.value === id)?.label}
                  </p>
                </li>
              {/each}
            </ul>
          </section>
        {/if}
      </div>
      <footer class="card-footer">
        <address>
          <section>
            <h2>Адрес:</h2>
            {[data.infoCompany.mainAddress.street, data.infoCompany.mainAddress.street]
              .filter((x) => x)
              .join(", ")}
          </section>
          {#if data.infoCompany.contacts?.length}
            <section>
              <h2>Контакты:</h2>
              <ol class="pl-4">
                {#each data.infoCompany.contacts as contact}
                  <li class="truncate">
                    {#if contact.type === "phone"}
                      <span>Телефон:</span>
                      <a href={`tel:${contact.value.replaceAll(" ", "")}`}>{contact.value}</a>
                    {:else if contact.type === "email"}
                      <span>Email:</span>
                      <a href={`mailto:${contact.value}`}>{contact.value}</a>
                    {:else}
                      <a href={contact.value}>{contact.value}</a>
                    {/if}
                  </li>
                {/each}
              </ol>
            </section>
          {/if}
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
  </div>
</div>

<style>
  .page {
    max-width: 600px;
  }
</style>
