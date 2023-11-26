<script lang="ts">
  import { page } from "$app/stores";

  import Section from "$lib/components/Section.svelte";
  import type { Client } from "$lib/types/crm";
  export let data: { clients: Client[] };
  $: companyId = $page.params.companyId;
</script>

<div class="flex flex-col items-start p-10">
  <button
    on:click={async () => {
      const res = await fetch(`/ru/crm/${companyId}/clients/api/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: "", contacts: [] }),
      });

      window.location.reload();
    }}
  >
    Добавить клиента
  </button>
  {#each data.clients as client}
    <Section>
      <h3>Имя</h3>

      <input
        type="text"
        bind:value={client.name}
        on:input={(e) => {
          client.name = e.target.value;
        }}
      />
    </Section>

    <Section>
      <h3>Контакты</h3>

      {#if !client?.contacts?.length}
        <p>Нет контактов</p>
      {:else}
        <ul>
          {#each client.contacts || [] as contact}
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
          client.contacts = [...(client.contacts || []), { type: "phone", value: "" }];
        }}
      >
        Добавить контакт
      </button>
    </Section>

    <button
      on:click={async () => {
        const res = await fetch(`/ru/crm/${companyId}/clients/api/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: client.name,
            contacts: client.contacts || [],
            id: client.id,
          }),
        });

        window.location.reload();
      }}
      class="bg-teal-500 p-2 rounded-xl"
    >
      Сохранить изменения
    </button>
  {/each}
</div>
