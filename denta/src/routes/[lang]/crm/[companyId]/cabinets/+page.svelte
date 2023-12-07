<script lang="ts">
  import { page } from "$app/stores";
  import AddButton from "$lib/components/AddButton.svelte";
  import Autocomplite from "$lib/components/Autocomplite.svelte";
  import CancelButton from "$lib/components/CancelButton.svelte";
  import DeleteButton from "$lib/components/DeleteButton.svelte";
  import EditButton from "$lib/components/EditButton.svelte";
  import SaveButton from "$lib/components/SaveButton.svelte";

  import Section from "$lib/components/Section.svelte";
  import SupportLink from "$lib/components/SupportLink.svelte";
  import type { Cabinet } from "$lib/types/crm";
  export let data: {
    cabinets: Cabinet[];
    countries: { value: string; label: string }[];
    cities: { value: string; label: string }[];
  };
  $: companyId = $page.params.companyId;
  $: cities = [] as { value: string; label: string }[];

  $: editing = null as Cabinet | null;

  $: city = editing?.address.city || "";
  $: pickedCity = cities.find((c) => c.value === city) || {
    value: "",
    label: "",
  };
</script>

<div class="flex flex-col gap-10 md:p-10">
  <Section>
    <h2>Добавить филиал</h2>
    <p>Вы можете добавить филиал, чтобы в дальнейшем записывать клиентов на приёмы.</p>

    <p>
      Если у вас есть только один филиал, то его все равно стоит добавить, чтобы клиенты могли
      записываться на приёмы.
    </p>

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
    {#if data.cabinets.length === 0}
      <p>Нет филиалов</p>
    {/if}
  </Section>

  {#if editing}
    <Section class="flex flex-col border-2 rounded-xl md:border-gray-300 md:p-5">
      <section>
        <h3>Название</h3>

        <input
          type="text"
          bind:value={editing.name}
          on:input={(e) => {
            editing.name = e.target.value;
            editing.changed = true;
          }}
        />
      </section>

      <section>
        <h3>Контакты</h3>

        {#if !editing?.contacts?.length}
          <p>Нет контактов</p>
        {:else}
          <ul>
            {#each editing.contacts || [] as contact}
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
                    editing.changed = true;
                  }}
                />
              </li>
            {/each}
          </ul>
        {/if}
        <AddButton
          on:click={() => {
            editing.contacts = [...(editing.contacts || []), { type: "phone", value: "" }];
          }}
        />
      </section>

      <section>
        <h3>Адрес</h3>
        <div class="flex flex-col gap-3">
          <Autocomplite
            datalist={data.countries}
            id="country"
            value={data.countries.find((c) => c.value === editing.address.country)}
            on:change={async (e) => {
              editing.address.country = e.detail.value;

              editing.address.city = "";
              if (!e.detail.value) {
                editing.changed = true;
                return;
              }

              cities = data.cities.filter((c) => c.countryId === e.detail.value);
              editing.changed = true;
            }}
          />

          <Autocomplite
            datalist={cities}
            id="city"
            value={pickedCity}
            on:change={(e) => {
              editing.address.city = e.detail.value;
              editing.changed = true;
            }}
          />

          <input
            type="text"
            placeholder="Улица"
            bind:value={editing.address.street}
            on:input={(e) => {
              editing.address.street = e.target.value;
              editing.changed = true;
            }}
          />
          <input
            type="text"
            placeholder="Дом"
            bind:value={editing.address.house}
            on:input={(e) => {
              editing.address.house = e.target.value;
              editing.changed = true;
            }}
          />
        </div>
        <div>
          {#if !editing.address.links?.length}
            <p>Нет ссылок на карте</p>
          {:else}
            <ul>
              {#each editing.address.links || [] as link}
                <li class="flex flex-wrap">
                  <select
                    bind:value={link.type}
                    on:change={(e) => {
                      link.type = e.target.value;
                      editing.changed = true;
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
                      editing.changed = true;
                    }}
                  />
                  <SupportLink href={link.value}>Перейти</SupportLink>
                  <DeleteButton
                    on:click={() => {
                      editing.address.links = editing.address.links.filter((l) => l !== link);
                      editing.changed = true;
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
              editing.address.links = [
                ...(editing.address.links || []),
                { type: "google", value: "" },
              ];
              editing.changed = true;
            }}
          />
        </div>
      </section>
      <div class="flex justify-between">
        <CancelButton
          on:click={async () => {
            window.location.reload();
          }}
        ></CancelButton>
        {#if editing.changed}
          <SaveButton
            on:click={async () => {
              const res = await fetch(`/ru/crm/${companyId}/cabinets/api/`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: editing.name,
                  contacts: editing.contacts || [],
                  id: editing.id,
                  address: editing.address,
                }),
              });

              window.location.reload();
            }}
          >
            Сохранить изменения
          </SaveButton>
        {/if}
      </div>
    </Section>
  {:else}
    <div class="flex flex-row flex-wrap gap-10">
      {#each data.cabinets as cabinet}
        <Section class="flex flex-col border-2 rounded-xl border-gray-300 p-5">
          <h3>{cabinet.name}</h3>
          <p>Контакты:</p>
          <ul>
            {#each cabinet.contacts || [] as contact}
              <li>
                {contact.type}
                :{contact.value}
              </li>
            {/each}
          </ul>
          <p>Адрес:</p>
          <p>
            <span>
              {data.countries.find((c) => c.value === cabinet.address.country)?.label ||
                cabinet.address.country},
            </span>
            <span>
              {data.cities.find((c) => c.value === cabinet.address.city)?.label ||
                cabinet.address.city},
            </span>
            <span>
              {cabinet.address.street || ""}
            </span>
            <span>
              {cabinet.address.house || ""}
            </span>
          </p>
          <ul>
            {#each cabinet.address.links || [] as link}
              <li>
                <SupportLink href={link.value}>{link.type}</SupportLink>
              </li>
            {/each}
          </ul>
          <div class="flex flex-row gap-5">
            <EditButton
              on:click={async () => {
                editing = cabinet;

                cities = data.cities.filter((c) => c.countryId === editing.address.country);
              }}
            >
              Редактировать
            </EditButton>
          </div>
        </Section>
      {/each}
    </div>
  {/if}
</div>
