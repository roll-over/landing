<script lang="ts">
  import { page } from "$app/stores";

  import Section from "$lib/components/Section.svelte";
  import type { Cabinet } from "$lib/types/crm";
  export let data: { cabinets: Cabinet[] };
  $: companyId = $page.params.companyId;
</script>

<div class="flex flex-col items-start p-10">
  <button
    on:click={async () => {
      const res = await fetch(`/ru/crm/${companyId}/cabinets/api/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: "", contacts: [] }),
      });
      const _data = await res.json();
      console.log(_data);
    }}
  >
    Добавить кабинет
  </button>
  {#each data.cabinets as cabinet}
    <Section>
      <h3>Имя</h3>

      <input
        type="text"
        bind:value={cabinet.name}
        on:input={(e) => {
          cabinet.name = e.target.value;
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
                }}
              />
            </li>
          {/each}
        </ul>
      {/if}
      <button
        on:click={() => {
          cabinet.contacts = [...(cabinet.contacts || []), { type: "phone", value: "" }];
        }}
      >
        Добавить контакт
      </button>
    </Section>

    <Section>
      <h3>Адрес</h3>
      <div class="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Страна"
          bind:value={cabinet.address.country}
          on:input={(e) => {
            cabinet.address.country = e.target.value;
          }}
        />
        <input
          type="text"
          placeholder="Город"
          bind:value={cabinet.address.city}
          on:input={(e) => {
            cabinet.address.city = e.target.value;
          }}
        />
        <input
          type="text"
          placeholder="Улица"
          bind:value={cabinet.address.street}
          on:input={(e) => {
            cabinet.address.street = e.target.value;
          }}
        />
        <input
          type="text"
          placeholder="Дом"
          bind:value={cabinet.address.house}
          on:input={(e) => {
            cabinet.address.house = e.target.value;
          }}
        />
      </div>
      <div>
        {#if !cabinet?.contacts?.length}
          <p>Нет ссылок на карте</p>
        {:else}
          <ul>
            {#each cabinet.address.links || [] as link}
              <li>
                <select
                  bind:value={link.type}
                  on:change={(e) => {
                    link.type = e.target.value;
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
                  }}
                />
                <a href={link.value}>Перейти</a>
              </li>
            {/each}
          </ul>
        {/if}
        <button
          on:click={() => {
            cabinet.address.links = [
              ...(cabinet.address.links || []),
              { type: "google", value: "" },
            ];
          }}
        >
          Добавить ссылку на карту
        </button>
      </div>
    </Section>

    <button
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
        const _data = await res.json();
        console.log(_data);
      }}
      class="bg-teal-500 p-2 rounded-xl"
    >
      Сохранить изменения
    </button>
  {/each}
</div>
