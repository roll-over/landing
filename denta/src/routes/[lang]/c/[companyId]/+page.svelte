<script lang="ts">
  import AnotherCompanies from "$lib/components/AnotherCompanies.svelte";
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

<svelte:head>
  <title>Поиск стоматологий в {data.city.label}, {data.country.label}</title>
  <meta
    name="description"
    content={`Поиск стоматологий в ${data.city.label}, ${data.country.label}`}
  />
</svelte:head>

<div class="flex flex-col justify-center items-center p-2">
  <div class="page flex flex-col gap-14">
    <div class="flex flex-col gap-14 card variant-glass-primary">
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
                  <p class="chip variant-filled-primary">
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
                      <a href={`tel:${contact.value}`}>{contact.value}</a>
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
