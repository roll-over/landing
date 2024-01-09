<script lang="ts">
  import { page } from "$app/stores";
  import { localisation } from "$lib/localisation/localisation";
  $: l = localisation($page.params.lang);
  export let data: {
    anotherCompanies: {
      id: string;
      name: string;
      mainAddress: {
        street: string;
        house: string;
      };
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
  <section>
    <h2>
      {l("Другие стоматологии в")}
      {data.city.label}, {data.country.label}
    </h2>
    <ol class="flex flex-wrap gap-5 pl-5">
      {#each data.anotherCompanies as cabinet}
        <li class="w-full">
          <a
            href={`/${$page.params.lang}/c/${cabinet.id}`}
            class="card variant-glass-secondary card-hover flex w-full flex-col justify-between gap-2 rounded-xl border-2 p-4"
          >
            <h3>{cabinet.name}</h3>
            <p>
              {l("Адрес")}: {[cabinet.mainAddress.street, cabinet.mainAddress.street]
                .filter((x) => x)
                .join(", ")}
            </p></a
          >
        </li>
      {/each}
      {#each data.anotherInfoCompanies as cabinet}
        <li class="w-full">
          <a
            href={`/${$page.params.lang}/company/${cabinet.publicId || cabinet._id}`}
            class=" card variant-glass-tertiary card-hover flex w-full flex-col justify-between gap-2 rounded-xl border-2 p-2"
          >
            <h3>{cabinet.title}</h3>
            <p>{l("Адрес")}: {cabinet.address}</p></a
          >
        </li>
      {/each}
    </ol>
  </section>
{/if}

<style>
  ol {
    max-width: 600px;
  }
</style>
