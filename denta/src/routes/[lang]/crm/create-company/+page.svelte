<script lang="ts">
  import { page } from "$app/stores";
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import Section from "$lib/components/Section.svelte";
  import { authAction } from "$lib/frontend/auth-action";
  import type { Cabinet, City, Country, Language } from "$lib/types/crm";
  import { getToastStore } from "@skeletonlabs/skeleton";

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

<div class="flex flex-col justify-center items-center">
  <div class="flex flex-col max-w-2xl card variant-glass-primary gap-4 p-4">
    <h1>Создать команию</h1>
    <input
      type="text"
      placeholder="Название"
      bind:value={name}
      on:click={() => {
        checkAuth();
      }}
      on:input={(e) => {
        name = e.target.value;
      }}
    />
    <div class="card variant-glass-secondary">
      <h2 class="card-header">Расположение головного офиса или клиники (если одна)</h2>
      <div class="p-4">
        <p>На следующем шаге вы сможете добавить филиалы и кабинеты.</p>
        <input
          type="text"
          list="countries"
          placeholder="Страна"
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
          placeholder="Город"
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
          toastStore.trigger({ message: "Заполните Название", background: "variant-filled-error" });
          return;
        }

        if (!country) {
          toastStore.trigger({ message: "Заполните Страну", background: "variant-filled-error" });
          return;
        }

        if (!city) {
          toastStore.trigger({ message: "Заполните Город", background: "variant-filled-error" });
          return;
        }

        const company = {
          name,
          mainAddress: {
            country: data.countries.find((c) => c.label === country)?.value || country,
            city: cities?.find((c) => c.label === city)?.value || city,
          },
        };

        fetch("/ru/crm/new/company/api/", {
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
      class="btn variant-filled-primary"
    >
      Создать
    </button>
  </div>
</div>
