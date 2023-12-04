<script lang="ts">
  import { page } from "$app/stores";

  export let data: {
    anotherCompanies: {
      _id: string;
      title: string;
      address: string;
    }[];
    anotherInfoCompanies: {
      _id: string;
      title: string;
      address: string;
    }[];
    country: { value: string; label: string };
    city: { value: string; label: string };
  };
</script>

{#if data.anotherCompanies?.length || data.anotherInfoCompanies?.length}
  <ol class="flex flex-col gap-5">
    <h1>
      Другие стоматологии в {data.city.label}, {data.country.label}
    </h1>
    {#each data.anotherCompanies as cabinet}
      <li>
        <a
          href={`/${$page.params.lang}/c/${cabinet.id}/`}
          class=" flex flex-col justify-between gap-2"
        >
          <h3>{cabinet.name}</h3>
          <p>
            Адрес: {[cabinet.mainAddress.street, cabinet.mainAddress.street]
              .filter((x) => x)
              .join(", ")}
          </p></a
        >
      </li>
    {/each}
    {#each data.anotherInfoCompanies as cabinet}
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
  </ol>
{/if}
