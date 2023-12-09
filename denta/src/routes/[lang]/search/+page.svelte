<script lang="ts">
  import { page } from "$app/stores";
  import Kyrgystan from "$lib/assets/countries/Kyrgyzstan.webp";
  import Kazakhstan from "$lib/assets/countries/Kazakhstan.webp";
  import Uzbekistan from "$lib/assets/countries/Uzbekistan.webp";
  import Armenia from "$lib/assets/countries/Armenia.webp";
  export let data: {
    countries: {
      value: string;
      label: string;
    }[];
  };

  const pictures = {
    kyrgyzstan: Kyrgystan,
    kazahstan: Kazakhstan,
    uzbekistan: Uzbekistan,
    armenia: Armenia,
  };
</script>

<div class="flex flex-col p-4 gap-4">
  <h1>Поиск по базе стоматологических клиник denta-crm</h1>
  <ul class="flex flex-row flex-wrap list gap-3 md:gap-10">
    {#each data.countries as country}
      <li>
        <a
          class="card card-hover p-4 variant-glass-primary relative min-h-2xl"
          href={`/${$page.params.lang}/search/${country.value}`}
        >
          {#if pictures[country.value]}
            <img src={pictures[country.value]} alt={country.label} />
            <span class="absolute bottom-0 right-1 p-4 text-2xl label">{country.label}</span>
          {:else}
            {country.label}
          {/if}
        </a>
      </li>
    {/each}
  </ul>
</div>

<style>
  .card {
    min-height: 100px;
    min-width: 200px;
    max-width: 400px;
    width: 100%;
  }

  .label {
    background-color: rgba(0, 255, 255, 0.815);
    border-radius: 10px;
  }
</style>
