<script lang="ts">
  import { page } from "$app/stores";
  import AddButton from "$lib/components/AddButton.svelte";
  import AutocompliteMultiple from "$lib/components/AutocompliteMultiple.svelte";
  import DeleteButton from "$lib/components/DeleteButton.svelte";
  import SaveButton from "$lib/components/SaveButton.svelte";
  import Section from "$lib/components/Section.svelte";
  import SupportLink from "$lib/components/SupportLink.svelte";
  import { availableCurrencies } from "$lib/currencies";
  import type { Company } from "$lib/types/crm";
  import { getToastStore } from "@skeletonlabs/skeleton";

  import { localisation } from "$lib/localisation/localisation";
  const l = localisation($page.params.lang);

  export let data: {
    company: Company;
    countries: any[];
    cities: any[];
    country: {
      value: string;
      label: string;
    };
    languages: {
      value: string;
      label: string;
    }[];
    city: { value: string; label: string };
  };

  const companyId = $page.params.companyId;
  const toastStore = getToastStore();

  const save = async () => {
    toastStore.trigger({ message: "Сохранение...", hideDismiss: true });

    const country =
      data.countries.find((c) => {
        return c.label === data.company.mainAddress.country;
      })?.value || data.company.mainAddress.country;

    const city =
      data.cities.find((c) => {
        return c.label === data.company.mainAddress.city;
      })?.value || data.company.mainAddress.city;

    const res = await fetch(`/${$page.params.lang}/crm/${companyId}/company/api/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.company.name,
        contacts: data.company.contacts || [],
        workingHours: data.company.workingHours,
        currency: data.company.currency,
        mainAddress: {
          country,
          city,
          street: data.company.mainAddress.street,
          house: data.company.mainAddress.house,
          links: data.company.mainAddress.links || [],
        },
        languagesIds: data.company.languagesIds,
      }),
    })
      .then((res) => {
        toastStore.clear();
        toastStore.trigger({
          message: "Сохранено",
          hideDismiss: true,
          background: "variant-filled-success",
        });
      })
      .catch((e) => {
        toastStore.clear();
        toastStore.trigger({
          message: "Ошибка сохранения",
          hideDismiss: true,
          background: "variant-filled-error",
        });
      });
  };
</script>

<div class="flex flex-col items-center w-full">
  <div class="flex flex-row flex-wrap gap-y-10 md:gap-x-5 md:p-10 justify-between">
    <Section>
      <h3>{l("Название")}</h3>
      <input
        type="text"
        bind:value={data.company.name}
        on:input={(e) => {
          data.company.name = e.target.value;
        }}
      />
    </Section>
    <Section>
      <h3>{l("Публичная страница")}</h3>
      <a href={`/${$page.params.lang}/c/${companyId}/`}>
        {`/${$page.params.lang}/c/${companyId}/`}
      </a></Section
    >
    <Section>
      <h3>{l("Владелец")}</h3>
      <p>
        {data.company.owner}
      </p>
    </Section>
    <Section>
      <h3>{l("Дата создания")}</h3>
      <p>
        {new Date(data.company.createdAt).toLocaleString()}
      </p>
    </Section>
    <Section>
      <h3>{l("Контакты")}</h3>

      {#if !data.company?.contacts?.length}
        <p>{l("Нет контактов")}</p>
      {:else}
        <ul>
          {#each data.company.contacts || [] as contact}
            <li>
              <select
                bind:value={contact.type}
                on:change={(e) => {
                  contact.type = e.target.value;
                }}
              >
                <option value="phone">{l("Телефон")}</option>
                <option value="email">Email</option>
                <option value="telegram">Telegram</option>
                <option value="vk">VK</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="linkedin">LinkedIn</option>
                <option value="twitter">Twitter</option>
                <option value="youtube">YouTube</option>
                <option value="tiktok">TikTok</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="viber">Viber</option>
                <option value="wechat">WeChat</option>
                <option value="skype">Skype</option>
              </select>:
              <input
                type="text"
                bind:value={contact.value}
                on:input={(e) => {
                  contact.value = e.target.value;
                }}
              />
            </li>
          {/each}
        </ul>
      {/if}
      <AddButton
        on:click={() => {
          data.company.contacts = [...(data.company.contacts || []), { type: "phone", value: "" }];
        }}
      />
    </Section>
    <Section>
      <h3>{l("Адрес")}</h3>
      <div class="flex flex-col gap-3">
        <input
          type="text"
          list="countries"
          placeholder={l("Страна")}
          bind:value={data.company.mainAddress.country}
          on:input={(e) => {
            data.company.mainAddress.country = e.target.value;
            data.company.changed = true;
          }}
          on:change={async () => {
            await fetch(
              `/${$page.params.lang}/location/${
                data.countries.find((c) => c.label === data.company.mainAddress.country)?.value
              }/cities/`,
            )
              .then((res) => res.json())
              .then((_data) => {
                data.cities = _data;
              });
            data.company.mainAddress.city = "";
            data.company.changed = true;
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
          placeholder={l("Город")}
          bind:value={data.company.mainAddress.city}
          on:input={(e) => {
            data.company.mainAddress.city = e.target.value;
            data.company.changed = true;
          }}
        />

        <datalist id="cities">
          {#each data.cities as city}
            <option value={city.label}>{city.label}</option>
          {/each}
        </datalist>

        <input
          type="text"
          placeholder={l("Улица")}
          bind:value={data.company.mainAddress.street}
          on:input={(e) => {
            data.company.mainAddress.street = e.target.value;
            data.company.changed = true;
          }}
        />
        <input
          type="text"
          placeholder={l("Дом")}
          bind:value={data.company.mainAddress.house}
          on:input={(e) => {
            data.company.mainAddress.house = e.target.value;
            data.company.changed = true;
          }}
        />
      </div>
      <div>
        {#if !data.company.mainAddress.links?.length}
          <p>{l("Нет ссылок на карте")}</p>
        {:else}
          <ul>
            {#each data.company.mainAddress.links || [] as link}
              <li class="flex flex-wrap">
                <select
                  bind:value={link.type}
                  on:change={(e) => {
                    link.type = e.target.value;
                    data.company.changed = true;
                  }}
                >
                  <option value="google">Google</option>
                  <option value="yandex">Yandex</option>
                  <option value="2gis">2gis</option>
                </select>:
                <input
                  type="text"
                  bind:value={link.value}
                  on:input={(e) => {
                    link.value = e.target.value;
                    data.company.changed = true;
                  }}
                />
                <SupportLink href={link.value}>{l("Перейти")}</SupportLink>
                <DeleteButton
                  on:click={() => {
                    data.company.mainAddress.links = data.company.mainAddress.links.filter(
                      (l) => l !== link,
                    );
                    data.company.changed = true;
                  }}
                ></DeleteButton>
              </li>
            {/each}
          </ul>
        {/if}
        <AddButton
          on:click={() => {
            data.company.mainAddress.links = [
              ...(data.company.mainAddress.links || []),
              { type: "google", value: "" },
            ];
            data.company.changed = true;
          }}
        />
      </div>
    </Section>

    <Section>
      <h3>{l("Языки приёма")}</h3>
      <AutocompliteMultiple
        datalist={data.languages}
        values={(data.company.languagesIds || []).map((langId) => {
          return data.languages.find((l) => l.value === langId);
        })}
        on:change={(e) => {
          data.company.languagesIds = e.detail.map((lang) => lang.value);
        }}
        id="languages"
      />
    </Section>

    <Section>
      <h3>{l("Рабочие часы")}</h3>
      <h4>{l("Начало")}</h4>
      <input
        type="time"
        bind:value={data.company.workingHours.startAt}
        on:input={(e) => {
          data.company.workingHours.startAt = e.target.value;
        }}
      />

      <h4>{l("Конец")}</h4>
      <input
        type="time"
        bind:value={data.company.workingHours.endAt}
        on:input={(e) => {
          data.company.workingHours.endAt = e.target.value;
        }}
      />

      <h4>{l("Временной шаг")}</h4>
      <select
        bind:value={data.company.workingHours.step}
        on:change={(e) => {
          data.company.workingHours.step = e.target.value;
        }}
      >
        <option value="15">15</option>
        <option value="30">30</option>
        <option value="60">60</option>
      </select>
    </Section>

    <Section>
      <h3>{l("Основная валюта")}</h3>

      <select
        bind:value={data.company.currency}
        on:change={(e) => {
          data.company.currency = e.target.value;
        }}
      >
        <option value="">{l("Не выбрано")}</option>
        {#each availableCurrencies as currency}
          <option value={currency}>{currency}</option>
        {/each}
      </select>
    </Section>
    <Section>
      <h3>{l("Удалить компанию")}</h3>
      <p>{l("Внимание! Это действие нельзя отменить!")}</p>
      <DeleteButton
        on:click={async () => {
          const res = await fetch(`/${$page.params.lang}/crm/${companyId}/company/api/`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ company: { name } }),
          });

          window.location.href = `/${$page.params.lang}/crm/`;
        }}
      ></DeleteButton>
    </Section>
  </div>
  <div class="fixed top-4.5 right-1.5">
    <SaveButton
      on:click={async () => {
        await save();
      }}
    ></SaveButton>
  </div>
</div>
