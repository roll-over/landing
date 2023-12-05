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
  <div class="flex flex-col gap-14">
    <h1>{data.infoCompany.name}</h1>

    <p>
      Адрес: {[data.infoCompany.mainAddress.street, data.infoCompany.mainAddress.street]
        .filter((x) => x)
        .join(", ")}
    </p>

    {#if data.infoCompany.description}
      <section>
        <h4>Описание:</h4>
        <p>{data.infoCompany.description}</p>
      </section>
    {/if}

    {#if data.infoCompany.contacts?.length}
      <section>
        <h4>Контакты:</h4>
        <ol class="pl-4">
          {#each data.infoCompany.contacts as contact}
            <li>
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
    <br />
    <AnotherCompanies
      data={{
        anotherCompanies: data.anotherCompanies,
        anotherInfoCompanies: data.anotherInfoCompanies,
        country: data.country,
        city: data.city,
      }}
    />
  </div>
</CenteredPage>
