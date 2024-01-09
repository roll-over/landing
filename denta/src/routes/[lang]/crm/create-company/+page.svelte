<script lang="ts">
  import { page } from "$app/stores";
  import { authAction } from "$lib/frontend/auth-action";
  import type { City, Country, Language } from "$lib/types/crm";
  import { getToastStore } from "@skeletonlabs/skeleton";
  import SvelteSeo from "svelte-seo";
  import { localisation } from "$lib/localisation/localisation";
  $: l = localisation($page.params.lang);

  export let data: {
    countries: Country[];
    lang: Language;
    session: {
      user: any;
    } | null;
  };

  const toastStore = getToastStore();

  $: name = null;
  $: country = null as Country | null;
  $: city = null;
  $: cities = [] as City[];

  const checkAuth = () => {
    if (!data.session?.user) {
      authAction();
      return false;
    }
    return true;
  };
</script>

<SvelteSeo
  title={l("Создать компанию")}
  description={l(
    "Зайти в личный кабинет и создать компанию для стоматологии или сети стоматологий в CRM-системе для стоматологов",
  )}
  canonical={`https://denta-crm.com/${$page.params.lang}/crm/create-company`}
/>

<div class="flex flex-col items-center justify-center">
  <div class="card variant-glass-primary flex max-w-2xl flex-col gap-4 p-4">
    <h1>{l("Создать команию")}</h1>
    <input
      type="text"
      class="input"
      placeholder={l("Название")}
      bind:value={name}
      on:click={() => {
        checkAuth();
      }}
      on:input={(e) => {
        name = e.target.value;
      }}
    />
    <div class="card variant-glass-secondary">
      <h2 class="card-header">{l("Расположение головного офиса или клиники (если одна)")}</h2>
      <p class="p-4">{l("На следующем шаге вы сможете добавить филиалы и кабинеты.")}</p>
      <div class="grid p-4 md:grid-cols-2">
        <input
          type="text"
          class="input max-w-xs"
          list="countries"
          placeholder={l("Страна")}
          bind:value={country}
          on:input={(e) => {
            country = e.target.value;
          }}
          on:click={() => {
            checkAuth();
          }}
          on:change={async () => {
            await fetch(
              `/${$page.params.lang}/location/${
                data.countries.find((c) => c.label === country)?.value
              }/cities/`,
            )
              .then((res) => res.json())
              .then((_data) => {
                cities = _data;

                return _data;
              });
          }}
        />
        <datalist id="countries">
          {#each data.countries as country}
            <option value={country.label}>{country.label}</option>
          {/each}
        </datalist>

        <input
          type="text"
          list="cities"
          class="input max-w-xs"
          placeholder={l("Город")}
          disabled={!country}
          on:click={() => {
            checkAuth();
          }}
          bind:value={city}
          on:input={(e) => {
            city = e.target.value;
          }}
        />

        <datalist id="cities">
          {#each cities as city}
            <option value={city.label}>{city.label}</option>
          {/each}
        </datalist>
      </div>
    </div>

    <button
      on:click={() => {
        if (!checkAuth()) {
          return;
        }

        if (!name) {
          toastStore.trigger({
            message: l("Заполните Название"),
            background: "variant-filled-error",
          });
          return;
        }

        if (!country) {
          toastStore.trigger({
            message: l("Заполните Страну"),
            background: "variant-filled-error",
          });
          return;
        }

        if (!city) {
          toastStore.trigger({ message: l("Заполните Город"), background: "variant-filled-error" });
          return;
        }

        const company = {
          name,
          mainAddress: {
            country: data.countries.find((c) => c.label === country)?.value || country,
            city: cities?.find((c) => c.label === city)?.value || city,
          },
        };

        fetch(`/${$page.params.lang}/crm/new/company/api/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(company),
        })
          .then((res) => {
            return res.json();
          })
          .then((c) => {
            window.location.href = `/${$page.params.lang}/crm/${c.id}/company/`;
          })
          .catch((e) => {
            window.location.href = `/${$page.params.lang}/crm/`;
          });
      }}
      class="variant-filled-primary btn"
    >
      {l("Создать")}
    </button>
  </div>
</div>
