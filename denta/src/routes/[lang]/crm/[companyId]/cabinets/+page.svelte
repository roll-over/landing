<script lang="ts">
  import { page } from "$app/stores";
  import AddButton from "$lib/components/AddButton.svelte";
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import DeleteButton from "$lib/components/DeleteButton.svelte";
  import SaveButton from "$lib/components/SaveButton.svelte";

  import Section from "$lib/components/Section.svelte";
  import SupportLink from "$lib/components/SupportLink.svelte";
  import type { Cabinet } from "$lib/types/crm";
  export let data: { cabinets: Cabinet[]; countries: { value: string; label: string }[] };
  $: companyId = $page.params.companyId;
  $: cities = [] as { value: string; label: string }[];
</script>

<div>
  <AddButton
    on:click={async () => {
      const res = await fetch(`/ru/crm/${companyId}/cabinets/api/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: "", contacts: [] }),
      });
      window.location.reload();
    }}
/>
  <div class="flex flex-row flex-wrap gap-10">
    {#each data.cabinets as cabinet}
      <div class="flex flex-col border-2 rounded-xl border-gray-400 p-5">
        <Section>
          <h3>Название</h3>

          <input
            type="text"
            bind:value={cabinet.name}
            on:input={(e) => {
              cabinet.name = e.target.value;
              cabinet.changed = true;
            }}
          />
        </Section>

        <Section>
          <h3>Контакты</h3>

          {#if !cabinet?.contacts?.length}
            <p>Нет контактов</p>
          {:else}
            <ul>
              {#each cabinet.contacts || [] as contact}
                <li>
                  <select
                    bind:value={contact.type}
                    on:change={(e) => {
                      contact.type = e.target.value;
                    }}
                  >
                    <option value="phone">Телефон</option>
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
                      cabinet.changed = true;
                    }}
                  />
                </li>
              {/each}
            </ul>
          {/if}
          <AddButton
            on:click={() => {
              cabinet.contacts = [...(cabinet.contacts || []), { type: "phone", value: "" }];
            }}
          />
        </Section>

        <Section>
          <h3>Адрес</h3>
          <div class="flex flex-col gap-3">
            <input
              type="text"
              list="countries"
              placeholder="Страна"
              bind:value={cabinet.address.country}
              on:input={(e) => {
                cabinet.address.country = e.target.value;
                cabinet.changed = true;
              }}
              on:change={async () => {
                await fetch(
                  `/${$page.params.lang}/location/${
                    data.countries.find((c) => c.label === cabinet.address.country)?.value
                  }/cities/`,
                )
                  .then((res) => res.json())
                  .then((_data) => {
                    cities = _data;
                  });
                cabinet.changed = true;
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
              bind:value={cabinet.address.city}
              on:input={(e) => {
                cabinet.address.city = e.target.value;
                cabinet.changed = true;
              }}
            />

            <datalist id="cities">
              {#each cities as city}
                <option value={city.label}>{city.label}</option>
              {/each}
            </datalist>

            <input
              type="text"
              placeholder="Улица"
              bind:value={cabinet.address.street}
              on:input={(e) => {
                cabinet.address.street = e.target.value;
                cabinet.changed = true;
              }}
            />
            <input
              type="text"
              placeholder="Дом"
              bind:value={cabinet.address.house}
              on:input={(e) => {
                cabinet.address.house = e.target.value;
                cabinet.changed = true;
              }}
            />
          </div>
          <div>
            {#if !cabinet.address.links?.length}
              <p>Нет ссылок на карте</p>
            {:else}
              <ul>
                {#each cabinet.address.links || [] as link}
                  <li class="flex flex-wrap">
                    <select
                      bind:value={link.type}
                      on:change={(e) => {
                        link.type = e.target.value;
                        cabinet.changed = true;
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
                        cabinet.changed = true;
                      }}
                    />
                    <SupportLink href={link.value}>Перейти</SupportLink>
                    <DeleteButton
                      on:click={() => {
                        cabinet.address.links = cabinet.address.links.filter((l) => l !== link);
                        cabinet.changed = true;
                      }}
                    >
                      Удалить
                    </DeleteButton>
                  </li>
                {/each}
              </ul>
            {/if}
            <AddButton
              on:click={() => {
                cabinet.address.links = [
                  ...(cabinet.address.links || []),
                  { type: "google", value: "" },
                ];
                cabinet.changed = true;
              }}
       />
          </div>
        </Section>
        {#if cabinet.changed}
          <SaveButton
            on:click={async () => {
              const res = await fetch(`/ru/crm/${companyId}/cabinets/api/`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: cabinet.name,
                  contacts: cabinet.contacts || [],
                  id: cabinet.id,
                  address: cabinet.address,
                }),
              });
              window.location.reload();
            }}
          >
            Сохранить изменения
          </SaveButton>
        {/if}
      </div>
    {/each}
  </div>
</div>
