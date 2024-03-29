<script lang="ts">
  import { page } from "$app/stores";
  import Kyrgystan from "$lib/assets/countries/Kyrgyzstan.webp";
  import Kyrgystan800 from "$lib/assets/countries/Kyrgyzstan-800.webp";
  import Kyrgystan480 from "$lib/assets/countries/Kyrgyzstan-480.webp";
  import Kyrgystan320 from "$lib/assets/countries/Kyrgyzstan-320.webp";

  import Kazakhstan from "$lib/assets/countries/Kazakhstan.webp";
  import Kazakhstan800 from "$lib/assets/countries/Kazakhstan-800.webp";
  import Kazakhstan480 from "$lib/assets/countries/Kazakhstan-480.webp";
  import Kazakhstan320 from "$lib/assets/countries/Kazakhstan-320.webp";
  import Uzbekistan from "$lib/assets/countries/Uzbekistan.webp";
  import Uzbekistan800 from "$lib/assets/countries/Uzbekistan-800.webp";
  import Uzbekistan480 from "$lib/assets/countries/Uzbekistan-480.webp";
  import Uzbekistan320 from "$lib/assets/countries/Uzbekistan-320.webp";

  import Armenia from "$lib/assets/countries/Armenia.webp";
  import Armenia800 from "$lib/assets/countries/Armenia-800.webp";
  import Armenia480 from "$lib/assets/countries/Armenia-480.webp";
  import Armenia320 from "$lib/assets/countries/Armenia-320.webp";
  import { localisation } from "$lib/localisation/localisation";
  $: l = localisation($page.params.lang);

  export let data: {
    countries: {
      value: string;
      label: string;
    }[];
  };

  const pictures = {
    kyrgyzstan: {
      full: Kyrgystan,
      800: Kyrgystan800,
      480: Kyrgystan480,
      320: Kyrgystan320,
    },
    kazahstan: {
      full: Kazakhstan,
      800: Kazakhstan800,
      480: Kazakhstan480,
      320: Kazakhstan320,
    },
    uzbekistan: {
      full: Uzbekistan,
      800: Uzbekistan800,
      480: Uzbekistan480,
      320: Uzbekistan320,
    },
    armeniya: { full: Armenia, 800: Armenia800, 480: Armenia480, 320: Armenia320 },
  };

  const cities = {
    kyrgyzstan: "bishkek",
    kazahstan: "almaty",
    uzbekistan: "tashkent",
    armeniya: "erevan",
  };
</script>

<svelte:head>
  <title>{l("Поиск стоматологий по странам")}</title>
  <meta
    name="description"
    content={`${l("Поиск стоматологий по странам")}: ${data.countries
      .map((c) => c.label)
      .slice(0, 5)
      .join(", ")}`}
  />
</svelte:head>

<div class="flex flex-col gap-4 p-4">
  <h1>{l("Поиск стоматологий в вашей стране по базе denta-crm")}</h1>
  <p>
    {l("На данный момент в базе denta-crm есть информация о стоматологиях в следующих странах")}:
    {data.countries.map((c) => c.label).join(", ")}
  </p>
  <p>{l("Мы постоянно работаем над тем, чтобы наша база была максимально полной и актуальной.")}</p>
  <ul class="list flex flex-row flex-wrap gap-3 md:gap-10">
    {#each data.countries as country}
      <li>
        <a
          class="min-h-2xl card variant-glass-primary card-hover relative p-4"
          href={`/${$page.params.lang}/search/${country.value}` +
            (cities[country.value] ? `/${cities[country.value]}` : "")}
        >
          {#if pictures[country.value]}
            {#if pictures[country.value].full}
              <img
                src={pictures[country.value]["800"]}
                srcset="
                    {pictures[country.value].full},
                    {pictures[country.value]['800']},
                    {pictures[country.value]['480']},
                    {pictures[country.value]['320']}"
                alt={`${l("Поиск стоматологий по стране")}: ${country.label}`}
                loading="lazy"
              />
            {:else}
              <img
                src={pictures[country.value]}
                alt={`${l("Поиск стоматологий по стране")}: ${country.label}`}
                loading="lazy"
              />
            {/if}
            <span class="label absolute bottom-0 right-1 p-4 text-2xl">{country.label}</span>
          {:else}
            {country.label}
          {/if}
        </a>
      </li>
    {/each}
  </ul>
</div>

<style>
  .card,
  img {
    min-height: 100px;
    min-width: 200px;
    max-width: 400px;
    width: 100%;
    height: 100%;
  }

  .label {
    background-color: rgba(0, 255, 255, 0.815);
    border-radius: 10px;
  }
</style>
